app.filter('isdate', function($filter) // http://www.angulartutorial.net/2014/04/date-filtering-and-formatting-in.html
{
	return function(input, format, timezone)
	{
		if(input == null){ return ''; }
		var _date = $filter('date')(new Date(input), format, timezone);
		return _date.toUpperCase();
	};
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });