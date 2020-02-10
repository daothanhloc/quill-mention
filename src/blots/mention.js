import Quill from "quill";

const Embed = Quill.import("blots/embed");

class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();
    const denotationChar = document.createElement("span");
    denotationChar.className = "ql-mention-denotation-char";
    denotationChar.innerHTML = data.denotationChar;
    node.appendChild(denotationChar);
    node.innerHTML += data.value;
    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach(key => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }
  
  update(mutations, context) {

    mutations.forEach(mutation => {
      if (mutation.type != 'childList') return;
      if (mutation.removedNodes.length == 0) return;

      setTimeout(() => this._remove(), 0);
    });

    const unhandledMutations = mutations.filter(m => m.type != 'childList')
    super.update(unhandledMutations, context);
  }

  _remove() {
    const cursorPosition = quill.getSelection().index - 1;
    
    this.remove();

    setTimeout(() => quill.setSelection(cursorPosition, Quill.sources.API), 0);
  }
  
}

MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";
MentionBlot.className = "mention";

Quill.register(MentionBlot);
