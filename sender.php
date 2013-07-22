
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
					<div class="small-2 large-2 columns"><label for="apiKey">api key</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="apiKey" value="key_first" id="apiKey"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="userId">user id</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="userId" value=")6n236c3h8)9-713p2o4" id="userId"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="container">html container</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="container" value="body" id="container"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="html">html content</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="html" value='<div class="welcome">Hello user</div>' id="userId"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="style">css stylesheet</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="style" value="http://ic.adfab.fr/mouthnode/leaderboard/css/pmagento/welcome.css" id="style"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="duration">duration</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="duration" value="" id="duration"/></div>
				</p>
                <p class="row">
					<div class="small-2 large-2 columns"><label for="script">js script</label></div>
					<div class="small-10 large-10 columns"><input type="text" name="script" value="" id="script"/></div>
				</p>
				<p class="row">
                    <div class="small-2 large-2 columns">&#129;</div>
                    <div class="small-10 large-10 columns"><input type="submit" value="Launch test &rarr;" class="large button expand"/></div>
				    
				</p>
			</form>
		</div>
	</body>
</html>
