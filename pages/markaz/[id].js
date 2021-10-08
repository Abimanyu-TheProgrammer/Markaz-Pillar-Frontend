import React from "react";
import DetailTemplate from "../../component/templates/detail/DetailWis";
import Layout from "../../component/layout";

export default function MarkazLayoutDetail() {
// kan bakal ada dua page pakai template ini.

// misal response backend untuk markaz ->
const markaz = {
    markaz_name: "Markaz Depok",
    markaz_background: "Lorem Ipsum Dolor Kolor",
    markaz_address: "Depok",
    markaz_cp: "Dodi 0811",
    markaz_category: "Makanan",
    markaz_needs: "Makanan"
}

// misal response backend untuk santri ->
const santri = {
    santri_name: "Siti",
    santri_background: "Lorem Ipsum Kolor Ahmet",
    santri_markaz: "Depok",
    santri_domisili: "Depok",
    santri_sex: "F",
    santri_birth: "Depok, 2001",
    santri_needs: "Ayam"
}

// karena data yang konsisten itu name dan background,
// kita bagi nya jadi -> data_consistent & data_inconsistent aja
const consistent = {
    name: markaz.markaz_name,
    background: markaz.markaz_background
}

// Ini yang ada truk-truk nya itu
const inconsistent = {
    "Alamat": markaz.markaz_address,
    "Contact Person": markaz.markaz_cp,
    "Kategori": markaz.markaz_category,
    "Kebutuhan Fasilitas": markaz.markaz_needs
}

// jadi kita pass ke template ya dua objects ini


  return (
    <DetailTemplate consistent={consistent} inconsistent={inconsistent} />
  );
}
