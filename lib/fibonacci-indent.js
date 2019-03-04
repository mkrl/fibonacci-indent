'use babel';

import { CompositeDisposable } from 'atom';

export default {

  /*
      Fibonacci (c. 1170 – c. 1250) was an Italian mathematician from the Republic of Pisa,
      considered to be "the most talented Western mathematician of the Middle Ages".
      The name he is commonly called, "Fibonacci" (Italian: [fiboˈnattʃi]),
      was made up in 1838 by the Franco-Italian historian Guillaume Libri
      and is short for filius Bonacci ("son of Bonacci").
      He is also known as Leonardo Bonacci, Leonardo of Pisa, or Leonardo Bigollo ("traveller") Pisano.
  */

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
      let spaces = editor.getSoftTabs()
      editor.insertText(this.fibonaize(selection, spaces))
    }
  },

  indentAll() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getText()
      console.log(selection)
      let spaces = editor.getSoftTabs()
      editor.setText(this.fibonaize(selection, spaces))
    }
  },

  // Get initial 2 space / tab offset, trim and offset again
  // with corresponding sequence number whitespace amount.
  fibonaize(text, spaces) {
    let lines = text.split('\n')
    let indent = spaces ? "  " : "	"
    // Add twice as much tabs because unlike spaces they don't come in pairs
    let coefficient = spaces ? 1 : 2
    let fibonaized = lines.map(line => {
      let whitespaces = 0
      let naked = line.trim()
      if ((line.startsWith(" ") || line.startsWith("	")) & (naked.length > 0)) {
        // Amount of total spaces and tabs
        // (looking for first non-whitespace character)
        whitespaces = (line.match(/( +?|\t+?)(?=\S)/) || "")[0].length
        // Rounding the amount to nearest odd number
        // that is smaller than the original
        whitespaces = (2 * Math.round((whitespaces / 2) - 0.01)) * coefficient
      }
      return `${indent.repeat(this.fibonumber(whitespaces/2))}${naked}`
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
