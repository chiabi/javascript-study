# Node.js 경로 다루기

## [Path](https://nodejs.org/api/path.html)

`path` 모듈은 파일 및 디렉토리 경로로 작업하기 위한 유틸리티를 제공한다.

```javascript
const path = require('path');
```
### path.resolve([...paths])

+ `...paths` 는 path또는 path segements의 순서 문자열이다.
+ Returns: <string>

path.resolve([...paths]) 메서드는 path 또는 path segments의 순서를 절대 경로로 해석한다.

경로의 순서는 오른쪽에서 왼쪽으로 처리되며, 각 경로는 절대 경로가 구성 될 때까지 앞에 추가된다.

예를 들어 path segements의 순서로 `/foo`, `/bar`, `baz`를 주고 `path.resolve('/foo', '/bar', 'baz')`를 호출하면 `/bar/baz`를 리턴한다.
```javascript
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 현재 working directory가 /home/myself/node, 라면 
// 이것은 '/home/myself/node/wwwroot/static_files/gif/image.gif'를 반환한다.
```

arguments 중 하나라도 문자열이 아닌경우 `TyprError`가 thorw된다.