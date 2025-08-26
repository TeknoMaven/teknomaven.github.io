$(document).ready(function() {
    // Tambah Hobi
    $('#addHobi').on('click', function() {
        $('#hobiGroup').append(`
            <div class="input-group mb-2">
                <input type="text" name="hobi[]" class="form-control" placeholder="Masukkan Hobi">
                <button type="button" class="btn btn-outline-danger remove-hobi">Hapus</button>
            </div>
        `);
    });

    // Tambah Sosial Media
    $('#addSosialMedia').on('click', function() {
        $('#sosialMediaGroup').append(`
            <div class="input-group mb-2">
                <input type="text" name="sosialMedia[]" class="form-control" placeholder="Masukkan Sosial Media">
                <button type="button" class="btn btn-outline-danger remove-sosial">Hapus</button>
            </div>
        `);
    });

    // Tambah Kegiatan Sertifikat
    $('#addKegiatan').on('click', function() {
        $('#kegiatanGroup').append(`
            <div class="input-group mb-2">
                <input type="text" name="namaKegiatan[]" class="form-control" placeholder="Nama Kegiatan Sertifikat">
                <input type="text" name="tahunKegiatan[]" class="form-control ms-2" placeholder="Tahun">
                <button type="button" class="btn btn-outline-danger remove-kegiatan ms-2">Hapus</button>
            </div>
        `);
    });

    // Hapus Hobi
    $(document).on('click', '.remove-hobi', function() {
        $(this).closest('.input-group').remove();
    });

    // Hapus Sosial Media
    $(document).on('click', '.remove-sosial', function() {
        $(this).closest('.input-group').remove();
    });

    // Hapus Kegiatan Sertifikat
    $(document).on('click', '.remove-kegiatan', function() {
        $(this).closest('.input-group').remove();
    });

    // Submit Form
    $('#dynamicForm').on('submit', function(e) {
        e.preventDefault();

        // Ambil data dari form
        let formData = {
            nama: $('#nama').val(),
            hobi: $('input[name="hobi[]"]').map(function() {
                return $(this).val();
            }).get(),
            sosialMedia: $('input[name="sosialMedia[]"]').map(function() {
                return $(this).val();
            }).get(),
            kegiatanSertifikat: $('input[name="namaKegiatan[]"]').map(function(index) {
                return {
                    namakegiatan: $('input[name="namaKegiatan[]"]').eq(index).val(),
                    tahunKegiatan: $('input[name="tahunKegiatan[]"]').eq(index).val()
                };
            }).get()
        };

        // Tampilkan hasil dalam format JSON
        $('#jsonResult').text(JSON.stringify(formData, null, 2));
    });
});
