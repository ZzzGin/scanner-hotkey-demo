# A demo - how to make both barcode reader and hotkey work
## problem description
One application, two requirements:
1. support hand scanner
2. support hotkey without addon keys like "ctrl" or "alt" and so on.

We are using `react-barcode-reader` for scanner; `react-hotkeys-hook` for hotkeys.
The problem here is, since hand scanner is also a keyboard input, text got scanned will also be hooked by hotkey framework. For example, we have a hotkey on `1`, but if we scan a barcode - `1234234234`, the `1` will be caught and trigger hotkey. 

## solution
Maintain a boolean. Scanner callback will set it to `true` at first and set it to `false` after 2 sec. In hotkey callback, we will read the boolean and only trigger logic when it is `false`.
![image](https://raw.githubusercontent.com/ZzzGin/scanner-hotkey-demo/main/img/idea.jpeg)
