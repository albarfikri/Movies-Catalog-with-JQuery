function searchMovie() {
    $('#movies-list').html('')
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '86a51de3',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search
                console.log(movies)
                $.each(movies, function (i, data) {
                    $('#movies-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="` + data.Poster + `" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">` + data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                })

                $('#search-input').val('')
            } else {
                $('#movies-list').html(`
                    <div class="col">
                        <h2 class="text-center">` + result.Error + `</h2>
                    </div>
                `)
            }
        }
    })
}

$('#search-button').on('click', function () {
    searchMovie()
})

$('#search-input').on('keyup', function (event) {
    if (event.which == 13) {
        searchMovie()
    }
})

// maksudnya cari element "movies-list" setelah itu saat diklik "see-detail" didalamnya baik munculnya di awal atau nanti jalankan fungsi berikut.
$('#movies-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '86a51de3',
            // this disini tombol detail yang sedang di klik
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                      <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item">Released : ` + movie.Released + `</li>
                                    <li class="list-group-item">Genre : ` + movie.Genre + `</li>
                                    <li class="list-group-item">Director : ` + movie.Director + `</li>
                                    <li class="list-group-item">Actor : ` + movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                      </div>
                `)
            }
        }
    })
})
