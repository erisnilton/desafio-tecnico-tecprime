import { isEqual, cloneDeep, isEmpty } from 'lodash-es';

const OBJ_CHANGES = Symbol.for('object.changes');

function getDiff(a: object, b: object) {
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const result: object = {};
  for (const key of allKeys) {
    if (isEqual(a[key], b[key])) continue;
    result[key] = b[key];
  }
  return result;
}

export class ObjectChanges {
  static create<T extends object>(this: void, obj: T): T {
    const old_obj = cloneDeep(obj);
    return new Proxy(obj, {
      get(target, p, receiver) {
        if (p === OBJ_CHANGES) {
          return getDiff(old_obj, target);
        }
        return Reflect.get(target, p, receiver);
      },
      has(target, p) {
        if (p === OBJ_CHANGES) return true;
        return Reflect.has(target, p);
      },
    });
  }

  static get<T extends object>(this: void, obj: T): Partial<T> | null {
    if (!ObjectChanges.is(obj)) {
      throw new TypeError('O Objeto não foi observado');
    }
    const result = Reflect.get(obj, OBJ_CHANGES) as Partial<T>;
    if (isEmpty(result)) {
      return null;
    }
    return result;
  }
  static is(this: void, obj: object): boolean {
    return Reflect.has(obj, OBJ_CHANGES);
  }
}
