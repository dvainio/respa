import { getEmptyDayItem, getEmptyPeriodItem } from "./form";

/*
* Iterate all periods and update their input indices.
* */
function updateAllPeriodIndices() {
  let $periods = $('#current-periods-list').children();

  $periods.each(function (rowId, row) {
    let $periodRow = $(row).find('#period-list');
    let periodInput = $periodRow.children();
    let dateInputs = periodInput.find('[id*="date-inputs-"]');
    let idPeriod = row.children[0]; //This is the hidden ID for each period item.
    let idResourcePeriod = row.children[1]; //This is the hidden ID for each period item.

    updatePeriodChildren($(row), rowId);

    //Update the hidden period ID to its corresponding row value.
    $(idPeriod).attr('id', $(idPeriod).attr('id').replace(/-(\d+)-/, "-" + rowId + "-"));
    $(idPeriod).attr('name', $(idPeriod).attr('name').replace(/-(\d+)-/, "-" + rowId + "-"));

    //Update the hidden resource ID to its corresponding row value.
    $(idResourcePeriod).attr('id', $(idResourcePeriod).attr('id').replace(/-(\d+)-/, "-" + rowId + "-"));
    $(idResourcePeriod).attr('name', $(idResourcePeriod).attr('name').replace(/-(\d+)-/, "-" + rowId + "-"));

    // Update the input ids of the divs containing period inputs and date inputs as well.
    $(periodInput).attr('id', $(periodInput).attr('id').replace(/-(\d+)/, "-" + rowId));
    $(dateInputs).attr('id', $(dateInputs).attr('id').replace(/-(\d+)/, "-" + rowId));

    //Update the name, start and end input ids.
    $periodRow.children().each(function (cellIndex, cell) {
      let $inputCells = $(cell).find('input');

      $inputCells.each(function (cellIndex, cell) {
        $(cell).attr('id', $(cell).attr('id').replace(/-(\d+)-/, "-" + rowId + "-"));
        $(cell).attr('name', $(cell).attr('name').replace(/-(\d+)-/, "-" + rowId + "-"));
      })
    });
  });
}

/*
* Update accordion-item, accordion and collapse ids.
* */
function updatePeriodChildren(periodItem, idNum) {
  periodItem.attr('id', `accordion-item-${idNum}`);

  periodItem.find('.dropdown-time').attr('id', `accordion${idNum}`);

  periodItem.find('button.delete-time').attr('id', `remove-button-${idNum}`);

  periodItem.find('.panel-heading').attr({
    id: `heading${idNum}`
  });

  periodItem.find('.panel-heading a').attr({
    href: `#collapse${idNum}`,
    "aria-controls": `#collapse${idNum}`
  });

  periodItem.find('.panel-collapse').attr({
    "aria-labelledby": `heading${idNum}`,
    id: `collapse${idNum}`
  });
}

/*
* Updates the indices of the various input boxes
* in the each day under a specific period.
*
* param: periodIdNmber (ex the integer from a collapse div or accordion div).
* */
function updatePeriodDaysIndices(periodIdNum) {
  let daysList = $('#collapse' + periodIdNum).find('#period-days-list');

  daysList.children().each(function (dayIndex, day) {
    $(day).attr('id', $(day).attr('id').replace(/-(\d+)-(\d+)/, '-' + periodIdNum + '-' + dayIndex));

    $(day).each(function (inputIndex, inputRow) {
      let $inputCells = $(inputRow).find('input');
      let $selectCells = $(inputRow).find('select');

      $inputCells.each(function (cellIndex, cellInput) {
        $(cellInput).attr('id', $(cellInput).attr('id').replace(/-(\d+)-(\d+)-/, '-' + periodIdNum + '-' + dayIndex + '-'));
        $(cellInput).attr('name', $(cellInput).attr('name').replace(/-(\d+)-(\d+)-/, '-' + periodIdNum + '-' + dayIndex + '-'));
      });

      $selectCells.each(function (cellIndex, cellInput) {
        $(cellInput).attr('id', $(cellInput).attr('id').replace(/-(\d+)-(\d+)-/, '-' + periodIdNum + '-' + dayIndex + '-'));
        $(cellInput).attr('name', $(cellInput).attr('name').replace(/-(\d+)-(\d+)-/, '-' + periodIdNum + '-' + dayIndex + '-'));
      });
    })
  });
}

/*
* Update all ids for the days input boxes in each period.
* */
function updateAllPeriodDaysIndices() {
  for (let i = 0; i < getPeriodCount(); i++) {
    updatePeriodDaysIndices(i);
  }
}

/*
* Update the indices in the management form of the days
* to match the current period.
* */
function updatePeriodDaysMgmtFormIndices(periodIdNum) {
  let $collapseItem = $('#collapse' + periodIdNum);
  let $managementFormInputs = $($collapseItem).find('#days-management-form').find('input');

  $managementFormInputs.each(function (id, input) {
    $(input).attr('id', $(input).attr('id').replace(/id_days-periods-(\d+)-/, 'id_days-periods-' + periodIdNum + '-'));
    $(input).attr('name', $(input).attr('name').replace(/days-periods-(\d+)-/, 'days-periods-' + periodIdNum + '-'));
  });
}

/*
* Get the amount of periods in the form.
* */
function getPeriodCount() {
  return $('#current-periods-list')[0].children.length;
}

/*
* Update all indices in the management form of the current periods.
* */
function updateAllDaysMgmtFormIndices() {
  let periodCount = getPeriodCount();

  for (let i = 0; i < periodCount; i++) {
    updatePeriodDaysMgmtFormIndices(i);
  }
}

/*
* General function for restoring the values in the
* management form for the days in a period.
* */
function restoreDaysMgmtFormValues(periodId) {
  $("#id_days-periods-" + periodId + "-TOTAL_FORMS").val("0");
  $("#id_days-periods-" + periodId + "-INITIAL_FORMS").val("0");
  $("#id_days-periods-" + periodId + "-MAX_NUM_FORMS").val("1000");
  $("#id_days-periods-" + periodId + "-MIN_NUM_FORMS").val("0");
}

/*
* Update the TOTAL_FORMS value in the management form of the days
* in the corresponding period.
* */
export function updateTotalDays(periodIdNumber) {
  let $collapseItem = $('#collapse' + periodIdNumber);
  let $periodDaysList = $collapseItem.find('#period-days-list');

  $($collapseItem).find('#id_days-periods-' + periodIdNumber + '-TOTAL_FORMS').val($periodDaysList[0].childElementCount);
}

/*
* Returns the day values from dates between the dates.
* ret: array of integers.
* */
function getDayValuesInterval(dateArray) {
  let days = [];

  for (let i = 0; i < dateArray.length; i++) {

    let day = dateArray[i].getDay();

    //The Javascript getDays() function's output does not correspond
    //to the Django models weekday choices. Therefore this little hack
    //was introduced.
    if (day === 0) {
      day = 6;
    } else {
      day--;
    }

    days.push(day.toString());
  }

  if (days.length <= 7) {
    return days;
  }

  //Return array without duplicate values.
  return Array.from(new Set(days));
}

/*
* Gets a list of dates between the given date inputs.
* */
function getDateInterval(startDate, endDate) {
  let dateArray = [];

  while (startDate <= endDate) {
    dateArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dateArray;
}

/*
* Handle either removing or adding new days based
* on the date input fields.
* */
export function modifyDays(dates) {
  let periodIdNum = dates.id.match(/[0-9]+/)[0];
  let $daysList = $('#collapse' + periodIdNum).find('#period-days-list');
  let dateInputs = dates.getElementsByTagName('input');
  let $currentWeekdayObjects = $daysList.children().find("[id*='-weekday']");
  let startDate = new Date(dateInputs[0].value);
  let endDate = new Date(dateInputs[1].value);
  let currentDays = [];

  if ((!startDate || !endDate) || (startDate > endDate)) {
    return;
  }

  for (let i = 0; i < $currentWeekdayObjects.length; i++) {
    currentDays.push($currentWeekdayObjects[i].value.toString());
  }

  let newDays = getDayValuesInterval(getDateInterval(startDate, endDate));

  //If a value exists in newDays but not in currentDays => it is a new day to be added.
  for (let i  = 0; i < newDays.length; i++) {
    if (!currentDays.includes(newDays[i])) {
      addDay(periodIdNum, newDays[i]);
    }
  }

  //If a value does not exist in newDays but it does exist in currentDays => remove it.
  for (let i = 0; i < currentDays.length; i++) {
    if (!newDays.includes(currentDays[i])) {
      removeDay(periodIdNum, i);
    }
  }

  updatePeriodDaysIndices(periodIdNum);
  updateTotalDays(periodIdNum);
}

/*
* Helper function for modifyDays(). Removes a day
* by creating the exact ID of a day.
* */
function removeDay(periodId, index) {
  $('#period-day-' + periodId + '-' + index).remove();
}

/*
* Add a new day to the period with the integer part of the ID
* and the integer representation of a weekday.
* */
function addDay(periodIdNum, weekday) {
  let $collapseItem = $('#collapse' + periodIdNum);
  let $daysList = $collapseItem.find('#period-days-list');
  let emptyDayItem = getEmptyDayItem();

  if (emptyDayItem) {
    let newDayItem = emptyDayItem.clone();

    newDayItem.find("[id*='-weekday']").val(weekday);
    $daysList.append(newDayItem);
  }
}

/*
* Strips a period of its input values and days.
* */
function removePeriodInputValues(periodItem, idNum) {
  //If there's an id_periods value, reset that one as well (used in the edit view).
  $('#id_periods-' + idNum + '-id').removeAttr('value');

  //Remove all days.
  let periodItemDays = periodItem.find('#period-days-list').children();
  for (let i = 0; i < periodItemDays.length; i++) {
    periodItemDays[i].remove();
  }

  //Restore the values in the days management form in this period.
  restoreDaysMgmtFormValues(idNum);
}

/*
* Adds a new period item and updates all the ids where necessary.
* */
export function addNewPeriod() {
  // Get the list or periods.
  let $periodList = $('#current-periods-list');
  let emptyPeriodItem = getEmptyPeriodItem();

  if (emptyPeriodItem) {
    let newItem = emptyPeriodItem.clone();
    const newIdNum = getPeriodCount();

    $periodList.append(newItem);

    updateAllPeriodIndices();
    updatePeriodsTotalForms();
    updatePeriodDaysMgmtFormIndices(newIdNum);
    removePeriodInputValues(newItem, newIdNum);
    attachPeriodEventHandlers(newItem, newIdNum);
  }
}

/*
* Attach the event handlers to a period objects' buttons.
* */
function attachPeriodEventHandlers(periodItem, periodIdNum) {
  //Attach event handler for removing a period (these are not cloned by default).
  let removeButton = periodItem.find('#remove-button-' + periodIdNum);
  removeButton.click(() => removePeriod(periodIdNum));

  //Attach the event handler for the date pickers.
  let $dates = periodItem.find('#date-inputs-' + periodIdNum);
  $dates.change(() => modifyDays($dates[0]));
}

/*
* Event handler to remove an hour accordion item
* take the Id of that accordion-item as argument.
**/
export function removePeriod(periodIdNum) {
  let $periodItem = $('#accordion-item-' + periodIdNum);

  if ($periodItem) {
    $periodItem.remove();

    updateAllPeriodIndices();
    updatePeriodsTotalForms();
    updateAllDaysMgmtFormIndices();
    updateAllPeriodDaysIndices();

    //Re-attach event handler for removing periods, in case the parameter does not
    //correspond with the new id. This bug might occur when removing a period
    //from the middle of the list.
    for (let i = 0; i < getPeriodCount(); i++) {
      let $periodButton = $('#accordion-item-' + i).find('#remove-button-' + i)[0];
      $periodButton.removeEventListener('click', () => removePeriod(periodIdNum));
      $periodButton.addEventListener('click', () => removePeriod(i));
    }
  }
}

export function updatePeriodsTotalForms() {
  document.getElementById('id_periods-TOTAL_FORMS').value = getPeriodCount();
}