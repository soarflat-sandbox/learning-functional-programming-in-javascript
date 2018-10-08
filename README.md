# JavaScript 関数型プログラミング

## 関数型プログラミングにおいて重要な概念（コアコンセプト）

- 純粋関数
- 副作用
- 宣言型プログラミング

## 関数型で思考する

- 関数型の用語で考える
- 関数型プログラミングとは何か、なぜ必要なのかを理解する
- 不変性と純粋関数の原則を理解する
- 関数型プログラミングのテクニックと、それらがソフトウェア設計全体に与えるインパクトを考える

## 関数型プログラミングとは何か

関数の利用に焦点を当てたソフトウェア開発スタイルのこと。

具体的に言えば

- 副作用を避ける
- アプリケーションにおける状態遷移を減らすために、データに関する制御フローと処理を抽象化する

を目指す開発スタイル。

<!-- TODO: 執筆途中
### 関数型プログラミングのサンプル

簡単なサンプルコードを改善していき、関数型プログラミングの考え方を学んでいく。

```js
document.querySelector('#msg').innerHTML = '<h1>Hello World</h1>';
```

上記はハードコードされてしまっているため、出力する文字列の変更などができず、柔軟に利用できない。

これを受け取った引数を元に出力をする関数にすると以下のようになる。

```js
function printMessage(elementId, format, message) {
  document.querySelector(
    `#${elementId}`
  ).innerHTML = `<${format}>${message}</$format>`;
}

printMessage('msg', 'h1', 'Hello, World');
```

だいぶ改善され、汎用性が上がった。

```js
``` -->

### 関数型プログラミングは宣言型である

関数型プログラミングは、宣言型プログラミングと呼ばれるカテゴリに分類される。

宣言型プログラミングとは、処理がどのように実装されているのか、またデータがどのように流れるかを明示することなく、一連の処理を表現するプログラミングパラダイム。

今日、もっとも一般的に利用されているプログラミングパラダイムは命令型や手続き型と呼ばれているものであり、多くの言語で利用されている。

命令形プログラミングにおいてのプログラムは、結果を計算するために状態を変更しながら上から下へ順に実行される一連の命令文として扱われる。

<!-- TODO: 執筆途中
#### 宣言型プログラミングと命令形プログラミングの違い

例えば、配列に格納された数値を２乗するプログラムを命令形プログラミングで記述すると以下のようになる。

```js
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < array.length; i++) {
  array[i] = Math.pow(array[i], 2);
}
console.log(array); // => [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

命令型プログラミングは、あるタスクをどのように事項すべきかを事細かに指示する。

上記の場合

- 指定された回数のループを行う
- それぞれの数値を２乗する

という指示をしている。

```js
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => Math.pow(num, 2));
console.log(array); // => [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
``` -->

### 純粋関数と副作用

関数型プログラミングは、純粋関数を利用し、不変性を持つプログラムを構築するという前提に基づいている。

#### 純粋関数

以下の特徴を持つ（条件を満たす）関数。

- 提供される入力値のみに依存する。
- 関数の実行中や関数呼び出しが行われる間に状態が変更する可能性のある値や、外部スコープの値には一切依存しない。
- 関数自身のスコープの外にある値を一切変更しない。

#### 不純な関数

上記を満たさない関数は「不純」な関数になる。以下は不純な関数の例。

```js
let counter = 0;

function increment() {
  return ++counter;
}
```

自身のスコープの外にある変数`counter`を読み書きしている。

つまり、外部スコープの値に依存しているため不純な関数である。

不純な関数は以下のように、任意のタイミングで任意の値に変更できる外部スコープの値（`counter`）に影響されるため、関数の評価（戻り値などの結果）を予測しづらい。

```js
let counter = 0;

function increment() {
  return ++counter;
}

console.log(increment()); // => 1
console.log(increment()); // => 2

// 任意のタイミングで任意の値に変更できる
counter = 100;

// counterが変更されたという事実を知らなければ increment() が 101 を返すことはわからない
console.log(increment()); // => 101
```

### 副作用を伴う命令型関数の改善

以下は、学生のレコード SSN で検索し、ブラウザに表示する命令型関数。

```js
function showStudent(ssn) {
  let student = db.find(ssn);

  if (student !== null) {
    document.querySelector(`${elementId}`).innerHTML = `${student.ssn},
     ${student.firstname},
     ${student.lastname}`;
  } else {
    throw new Error('Student not found!');
  }
}

showStudent('444-44-4444');
```

上記の関数は不純な関数であり、以下の問題点を有する（副作用を及ぼす）。

- `db`と`elementId`は関数のスコープ外のものを利用している。これらの変数は任意のタイミングで任意の値に変更できるため、`showStudent()`の実行結果も予測しづらい（必ず実行結果が同じになる保証をできない）。そのため、プログラムの信頼性を損ねている。
- HTML 要素に直接変更を加えている。

この関数に対して以下の改善を施す。

1. 関数を目的毎に分割する（１つの関数は１つの目的を持つように）。
2. 関数の処理に必要となるすべてのパラメーターを明示的に定義し、副作用を減らす。

```js
const find = curry((db, id) => {
  let obj = db.find(id);

  if (obj === null) {
    throw new Error('Object not found!');
  }
});

const csv = student =>
  `${student.ssn}, ${student.firstname}, ${student.lastname}`;

const append = curry((selector, info) => {
  document.querySelector(selector).innerHTML = info;
});

const showStudent = run(append('#student-info'), csv, find(db));

showStudent('444-44-4444');
```

### 参照透過性と代替性

参照透過性とは、関数が純粋であることを特徴づける性質のこと。

ある関数が同じ入力に対して常に同じ結果を返す場合、その関数は参照透過性を持っていると言える。

以下は参照透過性を持っていない関数の例。

```js
let counter = 0;

function increment() {
  return ++counter;
}
```

関数の戻り値がスコープ外の`counter`に依存しているため、同じ入力に対して常に同じ結果を返すわけではない。

そのため、参照透過性を持っていない。

この関数に参照透過性を持たせる（純粋関数にする）ためには以下のようにする。

```js
const increment = counter => counter + 1;
```

こうすることで、入力値（引数`counter`）が同じであれば、必ず同じ値を返すようになった。
