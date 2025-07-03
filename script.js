let barangList = JSON.parse(localStorage.getItem('barangList')) || [];

function simpanBarang() {
  localStorage.setItem('barangList', JSON.stringify(barangList));
}

function tambahBarang(nama, kategori, jumlah) {
  barangList.push({ nama, kategori, jumlah });
  simpanBarang();
  tampilkanBarang();
}

function hapusBarang(index) {
  barangList.splice(index, 1);
  simpanBarang();
  tampilkanBarang();
}

function tampilkanBarang() {
  const tbody = document.querySelector("#tabel-barang tbody");
  tbody.innerHTML = "";

  barangList.forEach((barang, index) => {
    const row = `
      <tr>
        <td>${barang.nama}</td>
        <td>${barang.kategori}</td>
        <td>${barang.jumlah}</td>
        <td><button onclick="hapusBarang(${index})">Hapus</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

document.getElementById("form-barang").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const kategori = document.getElementById("kategori").value;
  const jumlah = document.getElementById("jumlah").value;

  tambahBarang(nama, kategori, jumlah);

  this.reset();
});

tampilkanBarang();
