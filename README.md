# myna-iryohi-csv

マイナポータルからダウンロードした医療費の CSV ファイルから、医療費集計フォーム用のデータを生成するスクリプトです。

```console
yarn install
yarn tsx src/index.ts /path/to/医療費fromマイナポータル.csv
```

output:

```plain
ほげ医院,○,,,,1234,0
ぴよぴよ薬局,,○,,,543,0
もぐら病院,○,,,,3456,0
```

macOS では、 `yarn tsx src/index.ts /path/to/医療費fromマイナポータル.csv | pbcopy` でクリップボードにコピーして Excel に貼り付けることができて便利！！
