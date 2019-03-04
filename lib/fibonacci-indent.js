'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

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

  // Get initial 2 space / tab offset, trim and offset again
  // with corresponding sequence number whitespace amount
  fibonaize(text) {
    let i = 1, lines = text.split('\n')
    let fibonaized = lines.map(line => {
      let whitespaces = 0
      if (line.startsWith(" ") ||  line.startsWith("	")) {
        whitespaces = (line.match(/ {2}|\t/g) || []).length
      }
      let naked = line.trim()
      return `${'  '.repeat(this.fibonumber(whitespaces))}${naked}`
    })
    return(fibonaized.join('\n'))
  },

  // Calculating Fibonacci sequence number at num position
  fibonumber(num) {
    let a = 1, b = 0, buffer
    while (num > 0) {
      buffer = a
      a = a + b
      b = buffer
      num--
    }
    return b
  }

};
