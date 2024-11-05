//membuat sebuah array untuk menampung item yang dipilih
let Item = [];

//fungsi menambahkan item kedalam array
function additem(itemNameId, itemPriceId) {
    //mengambil nama barang
    const NamaBarang = document.getElementById(itemNameId).innerText;
    //mengambil harga barang, fungsi replace untuk menghilangkan titik
    const HargaBarang = parseFloat(document.getElementById(itemPriceId).innerText.replace(/\./g, ''));

    //memasukan nama barang dan harga barang ke dalam array
    Item.push({name: NamaBarang, price: HargaBarang});
    updateCart();

    alert("Berhasil menambahkan barang");
}

//fungsi untuk mengupdate tabel
function updateCart() {
    //mengambil informasi tabel
    const List = document.getElementById('itemList');
    List.innerHTML = '';

    //mngambil informasi dari array melalui index
    Item.forEach((item, index) => {
        //membuat elemen tr
        const row = document.createElement('tr');
        //memasukan informasi dari array ke tabel
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString('id-ID')}</td>
            <td><button onclick="remove(${index})">Hapus</button></td>
        `;
        
        List.appendChild(row);
    });

    HitungTotal();
}

//fungsi uuntuk menghapus barang
function remove(index) {
    Item.splice(index, 1);
    updateCart();
}

//fungsi menghitung subtotal dan diskon
function HitungTotal() {
    //menghitung subtotal barang yang ditambahkan
    const subtotal = Item.reduce((sum, item) => sum + item.price, 0);
    //menampilkan subtotal
    document.getElementById('subtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;

    let discont = 0;

    //melakukan pengecekan kondisi
    //apabila subtotal belanja lebih dari 2jt
    if (subtotal > 2000000){
        discont = 0.15;
    //apabila subtotal belanja lebih dari 1jt
    } else if (subtotal > 1000000){
        discont = 0.10;
    }

    //apabila jumlah barang yang ditambahkan lebih dari 5
    if(Item.length > 5){
        discont += 0.05;
    }

    //menghitung total setelah diskon
    const total = subtotal * (1 - discont);

    //menampilkan total
    document.getElementById('total').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

//fungsi menampilkan jendela keranjang dengan button
function toggleKeranjang() {
    const keranjang = document.getElementById('keranjang');
    const toggleButton = document.getElementById('toggleCartButton');

    //pengecekan kondisi
    //apabila jendela keranjang terbuka (translateY(0px)) maka akan tertutup (translateY(125px)) jika button di klik
    if (keranjang.style.transform === 'translateY(0px)') {
        keranjang.style.transform = 'translateY(125px)';
        keranjang.style.overflowY = 'hidden';
        toggleButton.innerHTML = "&#9650;";

    //apabila jendela keranjang tertutup (translateY(125px)) maka akan terbuka (translateY(0px)) jika button di klik
    } else {
        keranjang.style.transform = 'translateY(0px)';
        keranjang.style.overflowY = 'auto';
        toggleButton.innerHTML = "&#9660;";
    }
}

