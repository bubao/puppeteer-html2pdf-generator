# 服务器端的 html 生成 pdf

在服务端实现 html 生成 pdf，基于 puppeteer。

## 运行

运行之前，需要将需要生成 pdf 的项目放在`pdf`文件夹下，这里新建一个名为`test`的项目，并且新建`pdf/test/index.html`文件

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>A4 Size Form with URL Params</title>
	<style>
		@page {
			size: A4;
			margin: 20mm;
		}

		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
		}

		.container {
			width: 210mm;
			height: 297mm;
			margin: 0 auto;
			padding: 20mm;
			box-sizing: border-box;
			border: 1px solid #000;
		}

		h1 {
			text-align: center;
			margin-bottom: 20px;
		}

		form {
			display: flex;
			flex-direction: column;
		}

		label {
			margin-top: 10px;
		}

		input,
		select,
		textarea {
			width: 100%;
			padding: 8px;
			margin-top: 5px;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-sizing: border-box;
		}

		button {
			margin-top: 20px;
			padding: 10px;
			background-color: #4CAF50;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}

		button:hover {
			background-color: #45a049;
		}
	</style>
</head>

<body>
	<div class="container">
		<h1>A4 Size Form with URL Params</h1>
		<form action="#" method="get">
			<label for="name">Name:</label>
			<input type="text" id="name" name="name" placeholder="Enter your name">

			<label for="email">Email:</label>
			<input type="email" id="email" name="email" placeholder="Enter your email">

			<label for="dob">Date of Birth:</label>
			<input type="date" id="dob" name="dob">

			<label for="gender">Gender:</label>
			<select id="gender" name="gender">
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			</select>

			<label for="comments">Comments:</label>
			<textarea id="comments" name="comments" rows="4" placeholder="Enter your comments"></textarea>

			<button type="submit">Submit</button>
		</form>
	</div>

	<script>
		// 函数从 URL 中获取参数
		function getUrlParams() {
			const params = new URLSearchParams(window.location.search);
			return {
				name: params.get('name'),
				email: params.get('email'),
				dob: params.get('dob'),
				gender: params.get('gender'),
				comments: params.get('comments'),
			};
		}

		// 自动回填表单数据
		function fillForm() {
			const params = getUrlParams();
			if (params.name) document.getElementById('name').value = params.name;
			if (params.email) document.getElementById('email').value = params.email;
			if (params.dob) document.getElementById('dob').value = params.dob;
			if (params.gender) document.getElementById('gender').value = params.gender;
			if (params.comments) document.getElementById('comments').value = params.comments;
		}

		// 当页面加载时调用 fillForm 函数
		window.onload = fillForm;
	</script>
</body>

</html>
```

安装依赖：

```shell
nvm use 22
npm ci
```

浏览器请求：

```url
http://localhost:3000/test/dl.pdf?name=John+Doe&email=johndoe@example.com&dob=1990-01-01&gender=male&comments=Hello+world
```
