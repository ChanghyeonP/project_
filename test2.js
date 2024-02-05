searchPlaces();

// 내가 적용한 것
const searchForm = document.getElementById("submit_btn");
searchForm?.addEventListener("click", function (e) {
    e.preventDefault();
    searchPlaces();
});

function searchPlaces() {
    const keyword = document.getElementById("keyword").value;

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");

        return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data);

        displayPagination(pagination);

        const bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
    }
}

function displayMarker(place) {
    const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    window.kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
        props.setAddress(place);
        infowindow.setContent(`
        <span>
        ${place.place_name}
        </span>
        `);
        infowindow.open(map, marker);
        const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
        map.panTo(moveLatLon);
    }
    );
}