# raou_line_gas
LINEBot(GAS)の基礎となるコード<BR>

## 用意するもの
<B>・LINEBot</B><BR>
AccessTokenを使うのでメモっておいてください<BR>
<BR>
<B>・botを作る根気</B><BR>
個人的には作るのは楽しいですが、<BR>
ミスが出るとうわああああってなるのである程度の根気を要すると思います<BR>
<BR>
<B>・頭脳</B><BR>
どんなbotを作るかなどのアイディアを考えるのに必要です<BR>
冗談ではありません むしろこれが一番重要です<BR>

## コード
### [コード.gs](https://github.com/negi-0919/raou_line_gas/blob/master/%E3%82%B3%E3%83%BC%E3%83%88%E3%82%99.gs) <BR>
↑が本体です。//でところどころメモってあるのでそれを参考に色々いじってみてください
  
## ながれ
超ざっくり説明すると<BR>
  <BR>
  1.コードをGASにぶち込む<BR>
  2.公開>ウェブ アプリケーションとして導入<BR>
  次のユーザーとしてアプリケーションを実行：自分(メールアドレス)<BR>
  アプリケーションにアクセスできるユーザー：全員(匿名ユーザー含む)<BR>
  プロジェクトバージョンは更新毎に新規作成(変更内容は任意)<BR>
  3.公開後に表示されるアドレスの https:// 以降をbotの設定にあるWebhookにぶち込む<BR>
  <BR>
 これで動くはずです<BR>
    <BR>
## コードのライセンス
MITで設定してます<BR>
ただコードミスで負荷がかかりやすくなってる可能性はあるので<BR>
その辺は自己責任でお願いします
