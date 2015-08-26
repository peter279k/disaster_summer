$(function() {
	$.mobile.loading( "show", {
		text: "載入中...",
		textVisible: true,
		theme: "b",
		html: ""
	});
	
	var case_data = null;
	var case_over = 0;
	var case_ing = 0;
	
	$.getJSON("http://peter279k.com/xml_converter/xml_handler.php", function(data) {
		case_data = data["DataSet"]["diffgr:diffgram"]["NewDataSet"]["CASE_SUMMARY"];
		var str = "";
		str += "<thead><tr><th>發生時間</th><th>詳細位置</th><th>所在區</th><th>描述</th><th>案件情形</th></tr></thead>";
		str += "<tbody>";
		
		$("#attention-count").html("");
		$("#attention-over").html("");
		$("#attention-ing").html("");
		
		$("#attention-count").html("目前案件總數: "+case_data.length);
		
		for(var count=0;count<case_data.length;count++) {
			str += "<tr>";
			str += "<td>"+case_data[count]["CaseTime"]+"</td>";
			str += "<td>"+case_data[count]["CaseLocationDescription"]+"</td>";
			str += "<td>"+case_data[count]["CaseLocationDistrict"]+"</td>";
			str += "<td>"+case_data[count]["CaseDescription"]+"</td>";
			
			if(case_data[count]["CaseComplete"] == "true") {
				case_over += 1;
				str += "<td>已結案</td>";
			}
			else {
				case_ing += 1;
				str += "<td>未結案</td>";
			}
			
			str += "</tr>";
		}
	
		$("#attention-over").html("目前結案總數: "+case_over);
		$("#attention-ing").html("目前未結案總數: "+case_ing);
		
		$("#disaster-table").append(str+"</tbody>");
		$("#disaster-table").table("refresh");
		$.mobile.loading("hide");
	});
	
	$("#over-ing").change(function() {
		//CaseComplete
		if($("#over-ing").val() == "true") {
			var str = "";
			str += "<thead><tr><th>發生時間</th><th>詳細位置</th><th>所在區</th><th>描述</th></tr></thead>";
			str += "<tbody>";

			for(var count=0;count<case_data.length;count++) {
				if(case_data[count]["CaseComplete"] == "true") {
					str += "<tr>";
					str += "<td>"+case_data[count]["CaseTime"]+"</td>";
					str += "<td>"+case_data[count]["CaseLocationDescription"]+"</td>";
					str += "<td>"+case_data[count]["CaseLocationDistrict"]+"</td>";
					str += "<td>"+case_data[count]["CaseDescription"]+"</td>";
					str += "</tr>";
				}
			}
		}
		
		if($("#over-ing").val() == "false") {
			var str = "";
			str += "<thead><tr><th>發生時間</th><th>詳細位置</th><th>所在區</th><th>描述</th></tr></thead>";
			str += "<tbody>";

			for(var count=0;count<case_data.length;count++) {
				if(case_data[count]["CaseComplete"] == "false") {
					str += "<tr>";
					str += "<td>"+case_data[count]["CaseTime"]+"</td>";
					str += "<td>"+case_data[count]["CaseLocationDescription"]+"</td>";
					str += "<td>"+case_data[count]["CaseLocationDistrict"]+"</td>";
					str += "<td>"+case_data[count]["CaseDescription"]+"</td>";
					str += "</tr>";
				}
			}
		}
		
		$("#disaster-table").html("");
		$("#disaster-table").append(str+"</tbody>");
		$("#disaster-table").table("refresh");
		
	});
	
});