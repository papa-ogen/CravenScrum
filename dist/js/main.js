/*jslint white: true */

var cravenScrum = {};

cravenScrum = (function (cs) {
  "use strict";

  // Node Modifiers
  cs.hasClass = function (element, cssClass) {
    return element.classList.contains(cssClass);
  };

  cs.addClass = function (element, cssClass) {
    element.classList.add(cssClass);
  };

  cs.removeClass = function (element, cssClass) {
    element.classList.remove(cssClass);
  };

  // JSON
  cs.getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("get", url, true);
    xhr.responseType = "json";

    xhr.onload = function () {
      var status = xhr.status;

      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };

    xhr.send();
  };

  return cs;

} (cravenScrum || {}));
cravenScrum.calendar = (function (cs) {
  "use strict";

  cs.getToday = function (d) {
    return d.getDate();
  };

  cs.getDay = function (d) {
    return d.getDay() - 1; // Starts with sunday
  };

  cs.getMonth = function (d) {
    return d.getMonth();
  };

  cs.getYear = function (d) {
    return d.getFullYear();
  };

  cs.getMonthText = function (d) {
    var m = d.getMonth();

    switch (m) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "cravenScrum";
    }
  };

  cs.days = [];

  var c = document.getElementById("cravenCalendar");
  var d = new Date();
  var firstDayOfMonth = new Date(cs.getYear(d), cs.getMonth(d), 1).getDay() - 1;
  var lastDayOfMonth = new Date(cs.getYear(d), cs.getMonth(d) + 1, 0).getDate();
  var headers = [];
  var nodes = Array.prototype.slice.call(c.querySelectorAll("div"));
  var hideWeekends = true;
  var title = c.getElementsByTagName("h1")[0];

  nodes.forEach(function (item) {

    if (cs.hasClass(item, "header")) {
      // Create array of header nodeItems
      headers = Array.prototype.slice.call(item.querySelectorAll("div"));

    } else if (cs.hasClass(item, "day")) {
      // Add days to array
      cs.days.push(item);
    }

  });

  function addDayText(day, index) {
    var dateElement = {};

    if (index >= firstDayOfMonth && index <= lastDayOfMonth) {
      dateElement = day.querySelectorAll("date")[0];
      dateElement.innerText = index;
      day.setAttribute("date", cs.getYear(d) + "-" + (cs.getMonth(d) + 1) + "-" + index);

    } else {
      cs.addClass(day, "inactive");
    }

    var date = new Date(cs.getYear(d), cs.getMonth(d), index);

    if (date.getDay() === 6 || date.getDay() === 0) {
      if (hideWeekends) {
        cs.addClass(day, "hide");
      } else {
        cs.addClass(day, "weekend");
      }
    }

  }

  // Hide Weekends
  if (hideWeekends) {
    cs.addClass(headers[5], "hide");
    cs.addClass(headers[6], "hide");
  }

  // Set date number
  cs.days.forEach(addDayText);

  // Set Today's Header
  cs.addClass(headers[cs.getDay(d)], "today");

  // Highlight Today
  cs.addClass(cs.days[cs.getToday(d)], "active");

  // Set Page title
  title.innerText = cs.getMonthText(d);

  return cs;

} (cravenScrum || {}));
cravenScrum.projects = (function (cs) {
  "use strict";

  var cal = cs.calendar;

  cs.getSprints = function () {
    cs.getJSON("data/project1.json",
      function (err, data) {
        if (err !== null) {
          console.log("Something went wrong: " + err);

        } else {

          data.forEach(mapProjects);

        }
      });
  };

  function mapProjects(project) {
    var sprintStart;
    var sprintEnd;
    var demoDate;
    var thisDay;
    var sprintElement;

    project.iterations.forEach(function (sprint) {
      sprintStart = new Date(sprint.startDate);
      sprintEnd = new Date(sprint.endDate);
      demoDate = new Date(sprint.demoDate);

      // Add Sprint to days
      cal.days.forEach(function (day) {

        if (day.getAttribute("date")) {
          thisDay = new Date(day.getAttribute("date"));

          if (thisDay >= sprintStart && thisDay <= sprintEnd) {

            sprintElement = day.querySelectorAll("p")[0];
            sprintElement.innerText = sprint.title;

          } else if (thisDay.getTime() === demoDate.getTime()) {

            cs.addClass(day, "holiday");

            sprintElement = day.querySelectorAll("p")[0];
            sprintElement.innerText = "Demo";

          }
        }

      });
    });
  }

  // Add sprints to calendar
  cs.getSprints();

  return cs;

} (cravenScrum || {}));

