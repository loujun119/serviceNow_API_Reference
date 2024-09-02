日本時間を画面上で表示し、それをデータベースに保存する際にUTC（協定世界時）などの保存用の時間に変更する方法について説明します。

### 1. 日本時間の表示
- 画面上では日本標準時（JST、UTC+9）が使用されていることが一般的です。これは、例えばWebアプリケーションであれば、フロントエンドで日本時間を表示している場合が多いです。
- JavaScriptでは、`new Date()` で取得した時間は、デフォルトでクライアントのローカルタイム（この場合はJST）を返します。

### 2. 日本時間をUTCに変換して保存
データベースでは一般的にUTC時間で日時を保存します。これにより、異なるタイムゾーン間でのデータの一貫性を保つことができます。

#### JavaScriptを使用した変換方法
フロントエンドでJavaScriptを使用している場合、日時をUTCに変換してからサーバーに送信します。

```javascript
// 現在の日本時間を取得
let jstTime = new Date(); 

// UTC時間に変換
let utcTime = new Date(jstTime.getTime() - jstTime.getTimezoneOffset() * 60000);

// UTC時間をISOフォーマットで出力（例: "2024-09-02T15:00:00.000Z"）
let utcString = utcTime.toISOString();

// このUTC時間をサーバーやDBに保存
console.log(utcString);
```

Javaで日本時間をUTCに変換し、データベースに保存する方法について説明します。

### 1. 日本時間の取得と表示
まず、Javaで日本時間を取得するには、`java.time`パッケージの`ZonedDateTime`を使用します。デフォルトでJST（日本標準時）を使用することで、日本時間を正確に扱うことができます。

```java
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;

public class TimeConversion {
    public static void main(String[] args) {
        // 日本時間（JST）で現在の日時を取得
        ZonedDateTime jstTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));

        // 日本時間の表示
        System.out.println("日本時間: " + jstTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    }
}
```

### 2. 日本時間をUTCに変換
日本時間を取得した後、UTCに変換して保存用のフォーマットに変更します。

```java
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class TimeConversion {
    public static void main(String[] args) {
        // 日本時間（JST）で現在の日時を取得
        ZonedDateTime jstTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));

        // JSTをUTCに変換
        ZonedDateTime utcTime = jstTime.withZoneSameInstant(ZoneOffset.UTC);

        // UTC時間の表示
        System.out.println("UTC時間: " + utcTime.format(DateTimeFormatter.ISO_INSTANT));

        // 保存用のフォーマット
        String utcString = utcTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));
        System.out.println("保存用UTC: " + utcString);

        // このUTC時間をサーバーやDBに保存
        // 実際の保存はDBのAPIを通じて行います
    }
}
```

### 3. データベースへの保存
データベースに日時を保存する場合は、JDBCを使って保存します。UTC時間はISOフォーマットの文字列にして保存するか、`java.sql.Timestamp`を使用することが一般的です。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class SaveToDatabase {
    public static void main(String[] args) {
        ZonedDateTime jstTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        ZonedDateTime utcTime = jstTime.withZoneSameInstant(ZoneOffset.UTC);

        // UTC時間をISOフォーマットに変換
        String utcString = utcTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));

        // データベース接続情報
        String url = "jdbc:mysql://localhost:3306/your_database";
        String user = "your_username";
        String password = "your_password";

        // データベースに接続して保存
        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            String sql = "INSERT INTO events (event_time) VALUES (?)";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, utcString); // ISOフォーマットの日時をセット

            int rows = preparedStatement.executeUpdate();
            System.out.println(rows + " 行が挿入されました。");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### 4. 画面表示時のタイムゾーン変換
保存されたUTC時間を画面で再表示する際には、再度日本時間に変換します。

```java
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class DisplayInJST {
    public static void main(String[] args) {
        // 例として、DBから取得したUTCの日時
        String utcString = "2024-09-02T15:00:00Z";

        // UTC時間をZonedDateTimeに変換
        ZonedDateTime utcTime = ZonedDateTime.parse(utcString, DateTimeFormatter.ISO_DATE_TIME);

        // UTC時間を日本時間（JST）に変換
        ZonedDateTime jstTime = utcTime.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));

        // 日本時間の表示
        System.out.println("日本時間: " + jstTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    }
}
```

これらの手順を実行することで、Javaで日本時間をUTCに変換し、データベースに保存および画面表示の際に適切に時間を扱うことができます。