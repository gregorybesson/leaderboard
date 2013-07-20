
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>sender</title>
		<meta name="description" content="" />
		<meta name="author" content="faby" />
	</head>
	<body>
		<div>
			<form action="http://localhost/github/leaderboard/php/test.php" method="post" accept-charset="utf-8">
				<p>
					<label for="apiKey">api key</label>
					<input type="text" name="apiKey" value="key_first" id="apiKey"/>
				</p>
				<p>
					<label for="userId">user id</label>
					<input type="text" name="userId" value="" id="userId"/>
				</p>
				<p>
					<label for="container">html container</label>
					<input type="text" name="container" value="" id="container"/>
				</p>
				<p>
					<label for="html">html content</label>
					<input type="text" name="html" value="" id="userId"/>
				</p>
				<p>
					<label for="style">css stylesheet</label>
					<input type="text" name="style" value="" id="style"/>
				</p>
				<p>
					<label for="duration">duration boolean</label>
					<input type="text" name="duration" value="" id="duration"/>
				</p>
				<p>
					<label for="script">js script</label>
					<input type="text" name="script" value="" id="script"/>
				</p>
				<p><input type="submit" value="Launch test &rarr;"/></p>
			</form>
		</div>
	</body>
</html>