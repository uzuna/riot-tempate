# webpack + riot.js with pag template

Riot jsでDirectory + riot routeの二階層構造のページを作るサンプル

### 方針

1. ディレクトリ間で共有: js関係の`lib`と共通タグの`comp`です。
2. ディレクトリ内での固定名称を固定化する
  - main.js : webpackでentryを自動生成 + 共有タグを読み込み。
  - [module]/index.js : 共有コードを読み込みと配下のロジック周りの関係性を集約するためのファイル。 `window.app`に渡される
  - [module]/[name].js : ロジックのみを書く。機能/view別にファイルを分ける
  - [parts]/[name].tag : tagのHTMLを書く。機能/view別にファイルを分ける + javascriptのファイルと名前を合わせる
3. javascriptはtag内に書かずmixinで対応する
  - 連携を必要としないタグはこの限りではない。
4. 個人的な趣味によりCSSには`Semantic UI`を使用


### 実験中

1. 入力と出力でタグを分割して`riot.Observer`の機能で連携する(マウントで返ってくるAPIがObservableなのでそのまま使う)
  - 入力系のタグでイベントを発行し出力側は対応可能なイベントをlistenする
  - イベント名の付け方でタグが組み合わせられるかが決まる
  - 1,2パターンの入力イベント,入出力タグの組み合わせでしか試験していないのでより複雑な場合でも有効かは不明
