var statsArr = [
  "city",
  "province",
  "country",
  "confirmed",
  "deaths",
  "recovered",
  "lastUpdate",
];

var rowsAvailableFromBackend = 100;
for (rowNum = 0; rowNum < rowsAvailableFromBackend; rowNum++) {
  var newTableRow = $("<tr>");
  newTableRow.attr("id", "row" + rowNum);
  newTableRow.appendTo(tbody);
  for (colNum = 0; colNum < statsArr.length; colNum++) {
    var newTableData = $("<td>");
    newTableData.attr("id", statsArr[colNum] + rowNum + "_" + colNum);
    newTableData.attr("class", "has-text-centered");
    newTableData.text(statsArr[colNum] + rowNum + "_" + colNum);
    newTableData.appendTo($("#row" + rowNum));
  }
}
