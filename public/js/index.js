// Add google maps to page
var map;
var service;
var infowindow;

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) {
    return;
  }

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'click', () => {
    console.log(place.name);
    infowindow.setContent(place.name || '');
    infowindow.open({
      anchor: marker,
      shouldFocus: false,
    });
  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function initMap() {
  var pyrmont = new google.maps.LatLng(52.48753, -1.94903);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 14,
  });

  var request = {
    location: pyrmont,
    radius: '1000',
    type: ['supermarket'],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

let address1Field;
let address2Field;
let postalField;
// let city;
let autocomplete;
// let latitude;
// let longitude;

async function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = await autocomplete.getPlace();
  let address1 = '';
  let postcode = '';

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
    case 'street_number': {
      address1 = `${component.long_name} ${address1}`;
      break;
    }

    case 'route': {
      address1 += component.short_name;
      break;
    }

    case 'postal_code': {
      postcode = `${component.long_name}${postcode}`;
      break;
    }

    case 'postal_code_suffix': {
      postcode = `${postcode}-${component.long_name}`;
      break;
    }
    case 'locality':
      document.querySelector('#locality').value = component.long_name;
      break;
    case 'postal_town':
      document.querySelector('#locality').value = component.long_name;
      break;

    case 'country':
      document.querySelector('#country').value = component.long_name;
      break;
    default:
      break;
    }
  }
  // latitude = place.geometry.location.lat();
  // longitude = place.geometry.location.lng();
  address1Field.value = address1;
  postalField.value = postcode;
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.focus();
}

// Suggest address and autocomplete form.
function autocompleteFunc() {
  address1Field = document.querySelector('#firstLineAddress');
  address2Field = document.querySelector('#address-line-2');
  postalField = document.querySelector('#postcode');
  const input = document.getElementById('firstLineAddress');
  const options = {
    componentRestrictions: { country: 'uk' },
    fields: ['address_components', 'geometry'],
    strictBounds: false,
    types: ['address'],
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);

  address1Field.focus();
  autocomplete.addListener('place_changed', fillInAddress);
}

if (window.location.pathname.includes('/about-property/')) {
  initMap();

  const datePicker = function () {
    $('#startingDate').datepicker({
      dateFormat: 'yy-mm-dd',
      minDate: 0,
      maxDate: 365,
    });
    $('#endDate').datepicker({
      dateFormat: 'yy-mm-dd',
      selectOtherMonths: true,
      showWeek: true,
      changeMonth: true,
      changeYear: true,
      minDate: 31,
      maxDate: 365,
    });
  };
  $(datePicker);
  datePicker();

  // Query for expanding and contracting text area in description page
  var h = $('#property-description')[0].scrollHeight;

  $('#more').click(function () {
    $('#property-description').animate({
      height: h,
    });
    $('#property-description').animate({
      height: 'fit-content',
    });
    $('#less').css('display', 'block');
    $('#more').css('display', 'none');
  });

  $('#less').click(function () {
    $('#property-description').animate({
      height: '200px',
    });
    $('#less').css('display', 'none');
    $('#more').css('display', 'block');
  });

  let bookingForm = document.getElementById('bookingCalender');
  if (bookingForm !== null) {
    bookingForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const dates = new FormData(bookingForm);
      const formProps = Object.fromEntries(dates);

      var baseUrl = window.location.href;
      var propertyId = baseUrl.substring(baseUrl.lastIndexOf('/') + 1);

      console.log(formProps);

      const response = await fetch(`/api/bookings/${propertyId}`, {
        method: 'POST',
        body: JSON.stringify(formProps),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    });
  }

  //Posting the data to the db
  if (window.location.pathname === '/add-listing') {
    autocompleteFunc();
    const newPropertyForm = document.getElementById('newProperty');
    newPropertyForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const newPropertyFormFields = new FormData(newPropertyForm);
      const formProps = Object.fromEntries(newPropertyFormFields);
      let propertyAvailability = $('#flexSwitchCheckChecked').prop('checked');
      formProps.available = propertyAvailability;
      console.log(formProps);

      const response = await fetch('/api/property/', {
        method: 'POST',
        body: JSON.stringify(formProps),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        window.location.href = '/';
      }
    });
  }
  if (window.location.pathname === '/login') {
    // Sign in button
    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('click', async (e) => {
      e.preventDefault();
      const signInData = new FormData(signInForm);
      let signInFormProps = Object.fromEntries(signInData);

      // Login fetch request
      const response = await fetch('/api/user/signIn', {
        method: 'POST',
        body: JSON.stringify(signInFormProps),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        window.location.href = '/';
      }
    });

    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const signUpData = new FormData(signUpForm);
      let signUpFormProps = Object.fromEntries(signUpData);
      console.log(signUpFormProps);

      // Login fetch request
      const response = await fetch('/api/user/signUp', {
        method: 'POST',
        body: JSON.stringify(signUpFormProps),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        window.location.href = '/';
      }
    });
  }

  // Sign Out
  const signOutButton = document.getElementById('singOutButton');
  if (signOutButton) {
    signOutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/user/signOut', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    });
  }

  const fetchCities = async () => {
    const response = await fetch('/api/property/by/cities', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    let result = data.map((a) => a.city);
    return result;
  };

  $(async function () {
    let cities = await fetchCities();
    var availableTags = cities;
    $('#tags').autocomplete({
      source: availableTags,
    });
    $('#suggestionBox').click(function () {
      let valueCity = $('#tags').val();
      window.location.href = `/search-page/${valueCity}`;
    });
  });

  // Updating
  let bookmarkIcon = $('.bookmark-icon');
  if (bookmarkIcon) {
    bookmarkIcon.click(async function () {
      let value = $(this).parent().attr('property-id');
      const bookmark = await fetch('/api/bookmark', {
        method: 'POST',
        body: JSON.stringify({ property_id: value }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(bookmark);
    });
  }
  // Updating
  let removeBookmarkIcon = $('.removeBookmark-icon');
  if (removeBookmarkIcon) {
    removeBookmarkIcon.click(async function () {
      let value = $(this).parent().attr('property-id');
      const bookmark = await fetch('/api/bookmark', {
        method: 'DELETE',
        body: JSON.stringify({ property_id: value }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(bookmark);
    });
  }

  // Search page
  if (window.location.pathname.includes('/search-page')) {
    let filterButton = $('.search-filter');

    if (filterButton) {
      filterButton.on('click', function (e) {
        let sortByOption = e.target.getAttribute('option');

        let location = window.location.pathname;
        console.log(sortByOption);
        window.location.href = location + '?sortBy=' + sortByOption;
      });
    }
  }

  if (window.location.pathname.includes('/user-profile')) {
    const updateUserDetailsForm = document.getElementById('updateUserDetails');
    updateUserDetailsForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const newPropertyFormFields = new FormData(updateUserDetailsForm);
      const formProps = Object.fromEntries(newPropertyFormFields);
      console.log(formProps);
      try {
        const response = await fetch('/api/user/', {
          method: 'PUT',
          body: JSON.stringify(formProps),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          location.reload();
        }
      } catch (error) {
        console.error('Error in PUT request:', error);
      }
    });
  }

  const initializeLS = () => {
    // Calling the schedule array from the local storage
    const currencyTypeLS = localStorage.getItem('currencyType');

    // If the array is undefined, we create an empty array and push it to the local storage
    if (!currencyTypeLS) {
      localStorage.setItem('currencyType', 'GBP');
    }
  };

  initializeLS();

  let currencyTypeEl = $('#currencyType');

  currencyTypeEl.change(async function () {
    let newCurrency = currencyTypeEl.val();
    localStorage.setItem('currencyType', newCurrency);
    try {
      const response = await fetch('/api/property/currencyType', {
        method: 'POST',
        body: JSON.stringify({ currency: newCurrency }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (error) {
      console.error('Error in POST request:', error);
      return;
    }
  });

  // Update property info
  if (window.location.pathname.includes('/about-property/')) {
    updatePropertyButton.addEventListener('click', async (e) => {
      e.preventDefault();
      let address = document.querySelector('#updateAddress').value;
      let city = document.querySelector('#updateCity').value;
      let price = document.querySelector('#updatePrice').value;
      let bedrooms = document.querySelector('#updateBedrooms').value;
      let bathrooms = document.querySelector('#updateBathrooms').value;
      let reception = document.querySelector('#updateReception').value;
      let description = document.querySelector('#updateDescription').value;
      let available = document.querySelector('#updateAvailable').value;
      let baseUrl = window.location.href;
      let propertyId = baseUrl.substring(baseUrl.lastIndexOf('/') + 1);
      console.log(propertyId);
      let data = {
        address: address,
        city: city,
        price: price,
        rooms_number: bedrooms,
        bathroom_number: bathrooms,
        reception_number: reception,
        description: description,
        available: available,
      };
      console.log(data);
      await fetch(`/api/property/update/${propertyId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  }
}
