/**
 * 自定义实现的 useImmer Hook
 * 核心思想: 通过 Proxy 拦截对象操作，记录变更，然后生成新的不可变对象
 */
import { useState, useCallback } from 'react';

type Draft<T> = T;
type Updater<T> = (draft: Draft<T>) => void | T;

// 深拷贝工具函数
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  const cloned: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned as T;
}

// 创建可变的 draft 对象
function createDraft<T>(baseState: T): {
  draft: Draft<T>;
  patches: Map<string, any>;
  hasChanges: () => boolean;
} {
  const patches = new Map<string, any>(); // 记录修改
  const draft = deepClone(baseState);

  // 递归为对象创建 Proxy
  function makeProxy(target: any, path: string[] = []): any {
    return new Proxy(target, {
      set(obj: any, prop: string | symbol, value: any): boolean {
        // 记录修改路径
        const fullPath = [...path, String(prop)];
        patches.set(fullPath.join('.'), value);

        // 如果值是对象，也要代理化
        if (typeof value === 'object' && value !== null) {
          obj[prop] = makeProxy(value, fullPath);
        } else {
          obj[prop] = value;
        }

        return true;
      },

      get(obj: any, prop: string | symbol): any {
        const value = obj[prop];

        // 如果是对象，返回代理版本
        if (typeof value === 'object' && value !== null && !patches.has([...path, String(prop)].join('.'))) {
          return makeProxy(value, [...path, String(prop)]);
        }

        return value;
      }
    });
  }

  return {
    draft: makeProxy(draft) as Draft<T>,
    patches,
    hasChanges: () => patches.size > 0
  };
}

// 应用变更到原始状态
function applyPatches<T>(baseState: T, patches: Map<string, any>): T {
  if (patches.size === 0) {
    return baseState; // 没有变更，返回原对象
  }

  const newState = deepClone(baseState);

  // 应用所有补丁
  patches.forEach((value, path) => {
    const keys = path.split('.');
    let current: any = newState;

    // 导航到目标位置
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }

    // 设置最终值
    const finalKey = keys[keys.length - 1];
    current[finalKey] = value;
  });

  return newState;
}

/**
 * 自定义 useImmer Hook
 * @param initialState - 初始状态
 * @returns 返回 [当前状态, 更新函数]
 */
function useImmer<T>(initialState: T): [T, (updater: Updater<T>) => void] {
  const [state, setState] = useState<T>(initialState);

  const updateState = useCallback((updater: Updater<T>): void => {
    setState(currentState => {
      if (typeof updater === 'function') {
        // 创建 draft
        const { draft, patches, hasChanges } = createDraft(currentState);

        // 执行更新函数
        const result = updater(draft);

        // 如果返回了新值，直接使用
        if (result !== undefined) {
          return result;
        }

        // 如果有变更，应用补丁生成新状态
        if (hasChanges()) {
          const newState = applyPatches(currentState, patches);
          return newState;
        }

        // 没有变更，返回当前状态
        return currentState;
      } else {
        // 直接设置新值
        return updater;
      }
    });
  }, []); // 移除依赖，使用setState的回调形式

  return [state, updateState];
}

export default useImmer;

/**
 * 使用示例:
 *
 * const [person, updatePerson] = useImmer({
 *   name: 'John',
 *   age: 30,
 *   hobbies: ['reading', 'coding'],
 *   address: {
 *     city: 'Beijing',
 *     street: '123 Main St'
 *   }
 * });
 *
 * // 更新嵌套对象
 * const updateCity = () => {
 *   updatePerson(draft => {
 *     draft.address.city = 'Shanghai'; // 直接修改
 *     draft.age = 31;
 *     draft.hobbies.push('swimming');  // 数组操作
 *   });
 * };
 */