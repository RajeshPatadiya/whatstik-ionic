import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private ScriptsMap: Map<any, Node> = new Map();
  private host: Node;

  constructor() {
    this.host = document.head;
  }

  addScript(key: any, Script: string): void {
    let ScriptEl = document.createElement('script');
    ScriptEl.src = Script;
    this.ScriptsMap.set(key, ScriptEl);
    this.host.appendChild(ScriptEl);
  }

  removeScript(key: any): void {
    const ScriptEl = this.ScriptsMap.get(key);
    if (ScriptEl) {
      this.ScriptsMap.delete(key);
      this.host.removeChild(ScriptEl);
    }
  }
}
