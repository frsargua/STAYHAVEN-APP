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
let autocomplete;
let latitude;
let longitude;
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

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
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

      case 'country':
        document.querySelector('#country').value = component.long_name;
        break;
    }
  }
  latitude = place.geometry['location'].lat();
  longitude = place.geometry['location'].lng();
  address1Field.value = address1;
  postalField.value = postcode;
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.focus();
}

window.initMap = initMap;

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
