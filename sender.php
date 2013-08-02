
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>sender</title>
		<meta name="description" content="" />
		<meta name="author" content="fabrice" />
        <link rel="stylesheet" href="css/normalize.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
		<link rel="stylesheet" href="css/foundation.min.css" type="text/css" media="screen" title="no title" charset="utf-8"/>
		<style type="text/css" media="screen">
			form{
			    margin:10px 0;
			}
			h1{
			    margin:0 10px;
			}
			
		</style>
	</head>
	<body>
		<div>
		    <h1 id="title">Node notification tester</h1>
			<form action="php/test.php" method="post" accept-charset="utf-8" class="large-6">
				<p class="row">
					<div class="small-2 large-2 columns"><label for="apiKey">Api key</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="apiKey" value="key_first" id="apiKey"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="userId">User id</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="userId" value="#3e01206(0c1n1o6g2e5" id="userId"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="container">Html container</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="container" value="body" id="container"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="html">Action (welcome, quit or win)</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="action" value='welcome' id="action"/></div>
				</p>
				<p class="row">
                    <div class="small-2 large-2 columns">&#129;</div>
                    <div class="small-10 large-10 columns"><input type="submit" value="Launch test &rarr;" class="large button expand"/></div>
				</p>
			</form>
		</div>
	</body>
</html>
