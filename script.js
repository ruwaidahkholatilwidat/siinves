<script>
  // Data awal (akan dimasukkan ke localStorage hanya sekali)
  const dataAwal = [
    { nama: "Laptop", kategori: "Elektronik", jumlah: 5 },
    { nama: "Kursi", kategori: "Perabot", jumlah: 30 },
    { nama: "Papan Tulis", kategori: "Alat Tulis", jumlah: 2 }
  ];

  // Cek apakah localStorage sudah punya data
  let daftarBarang = JSON.parse(localStorage.getItem('barang'));
  if (!daftarBarang) {
    // kalau belum, set data default
    localStorage.setItem('barang', JSON.stringify(dataAwal));
    daftarBarang = dataAwal;
  }
</script>

let barangList = JSON.parse(localStorage.getItem('barangList')) || [];

function simpanBarang() {
  localStorage.setItem('barangList', JSON.stringify(barangList));
}

function tambahBarang(nama, kategori, jumlah) {
  barangList.push({ nama, kategori, jumlah });
  simpanBarang();
  tampilkanBarang();
}

function editBarang(index) {
  const barang = barangList[index];
  document.getElementById("nama").value = barang.nama;
  document.getElementById("kategori").value = barang.kategori;
  document.getElementById("jumlah").value = barang.jumlah;
  document.getElementById("editIndex").value = index;
}

function updateBarang(index, nama, kategori, jumlah) {
  barangList[index] = { nama, kategori, jumlah };
  simpanBarang();
  tampilkanBarang();
}

function hapusBarang(index) {
  if (confirm("Yakin ingin menghapus barang ini?")) {
    barangList.splice(index, 1);
    simpanBarang();
    tampilkanBarang();
  }
  function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
}

function tampilkanBarang() {
  const tbody = document.querySelector("#tabel-barang tbody");
  const filter = document.getElementById("filterKategori").value.toLowerCase();
  tbody.innerHTML = "";

  const kategoriSet = new Set();

  barangList.forEach((barang, index) => {
    if (filter && barang.kategori.toLowerCase() !== filter) return;

    kategoriSet.add(barang.kategori);

    const row = `
      <tr>
        <td>${barang.nama}</td>
        <td>${barang.kategori}</td>
        <td>${barang.jumlah}</td>
        <td>
          <button onclick="editBarang(${index})">Edit</button>
          <button onclick="hapusBarang(${index})">Hapus</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  // Update dropdown filter
  const filterDropdown = document.getElementById("filterKategori");
  filterDropdown.innerHTML = `<option value="">Semua</option>`;
  [...kategoriSet].forEach(k => {
    filterDropdown.innerHTML += `<option value="${k}">${k}</option>`;
  });
}

document.getElementById("form-barang").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const kategori = document.getElementById("kategori").value;
  const jumlah = document.getElementById("jumlah").value;
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    tambahBarang(nama, kategori, jumlah);
  } else {
    updateBarang(editIndex, nama, kategori, jumlah);
    document.getElementById("editIndex").value = "";
  }

  this.reset();
});

document.getElementById("filterKategori").addEventListener("change", tampilkanBarang);

// Export Excel
function exportExcel() {
  let data = [["Nama", "Kategori", "Jumlah"]];
  barangList.forEach(b => {
    data.push([b.nama, b.kategori, b.jumlah]);
  });

  let csv = data.map(row => row.join("\t")).join("\n");

  let blob = new Blob([csv], { type: "application/vnd.ms-excel" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "inventaris_barang.xls";
  a.click();
}

tampilkanBarang();
