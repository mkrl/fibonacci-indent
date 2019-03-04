'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fibonacci-indent:indent': () => this.indent(),
      'fibonacci-indent:indentAll': () => this.indentAll()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  indent() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      editor.insertText(this.fibonaize(selection))
    }
  },

  fibonaize(text) {
    let i = 1, lines = text.split('\n')
    let fibonaized = lines.map(line => {
      let whitespaces = line.match(/\s+?(?=\S)/) || [""]
      //parsing huge whitespace, but if no whitespace present, it's not working right
      let naked = line.trim()
      return `${'  '.repeat(this.fibonumber(whitespaces))}${naked}`
    });
    return(fibonaized.join('\n'))
  },

  fibonumber(num) {
    let a = 1, b = 0, buffer
    while (num >= 0) {
      buffer = a
      a = a + b
      b = buffer
      num--
    }
    return b
  }

};
