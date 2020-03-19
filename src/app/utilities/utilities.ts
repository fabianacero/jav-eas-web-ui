import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
  constructor() {
  }

  /**
   * Obtener ip de usuario
   */
  encodeJsonElement(item) {
    return btoa(JSON.stringify(item));
  }

  decodeJsonElement(item, objectToMap) {
    if (!item) {
      return objectToMap;
    }
    return this.recursiveAssign(objectToMap, JSON.parse(atob(item)));
  }

  recursiveAssign(object, json) {
    if (Object(json) !== json) return json;
    if (Object(object) !== object) object = {};
    for (let key in json) {
      object[key] = this.recursiveAssign(object[key], json[key]);
    }
    return object;
  }

  public hasProperty(objectToInspect, propertyToFind) {
    let hasProperty = false;
    if (typeof objectToInspect != 'undefined') {
      const val1 = typeof objectToInspect != 'object' && objectToInspect.length > 0;
      const val2 = (typeof objectToInspect == 'object' && !this.isEmpty(objectToInspect));
      const val3 = (typeof objectToInspect[propertyToFind] != 'undefined');
      if ((
        (val1 || val2) && val3)) {
        hasProperty = true;
      }
    }
    return hasProperty;
  }

  public isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  public saveOnSession(name: string, element: any) {
    let elementToStorage: string;
    if (element instanceof Object || element instanceof Array) {
      elementToStorage = JSON.stringify(element);
    }
    elementToStorage = btoa(elementToStorage);
    sessionStorage.setItem(name, elementToStorage);
  }

  public getFromSession(name, decode?: boolean) {
    const sessionItem = sessionStorage.getItem(name);
    let elementOnStorage = null;
    if (!sessionItem) {
      return sessionItem;
    }
    elementOnStorage = atob(sessionItem);
    if (typeof decode !== 'undefined' && decode) {
      elementOnStorage = decodeURIComponent(escape(elementOnStorage));
    }
    return JSON.parse(elementOnStorage) ? JSON.parse(elementOnStorage) : elementOnStorage;
  }
}
