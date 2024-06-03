BEGIN;
CREATE VIEW public.promo_buku AS
SELECT buku.id AS id_buku,
       buku.judul AS judul_buku,
       relasiBukuPromo.diskon AS diskon,
       eventPromo.tanggal_mulai AS mulai_promo,
       eventPromo.tanggal_terakhir AS akhir_promo,
       relasiCabangBuku.harga AS harga_awal,
       relasiCabangBuku.harga * (1 - relasiBukuPromo.diskon / 100.0) AS harga_diskon,
       relasiCabangBuku.kuantitas AS kuantitas,
       relasiCabangBuku.id_cabang AS kode_cabang
FROM public.buku buku
LEFT JOIN public.relasi_buku_promo relasiBukuPromo ON buku.id = relasiBukuPromo.id_buku
LEFT JOIN public.promo eventPromo ON eventPromo.id = relasiBukuPromo.id_promo
LEFT JOIN public.relasi_cabang_buku relasiCabangBuku ON relasiCabangBuku.id_buku = buku.id;

CREATE VIEW public.buku_dengan_cabang AS
SELECT buku.id AS id_buku,
        buku.judul AS judul_buku,
        buku.ISBN AS ISBN,
        relasiCabangBuku.harga AS harga,
        relasiCabangBuku.kuantitas AS kuantitas,
        relasiCabangBuku.id_cabang AS kode_cabang,
		relasiCabangBuku.last_updated AS terakhir_diupdate,	
		relasiCabangBuku.created_at AS created_at
FROM public.buku buku
JOIN public.relasi_cabang_buku relasiCabangBuku ON relasiCabangBuku.id_buku = buku.id;

CREATE VIEW public.buku_dengan_penulis AS
SELECT buku.id AS id_buku,
        buku.judul AS judul_buku,
        buku.ISBN AS ISBN,
        penulis.nama,
		penulis.id AS id_penulis
FROM public.relasi_penulis_buku relasiPenulisBuku
JOIN public.buku buku ON relasiPenulisBuku.id_buku = buku.id
JOIN public.penulis penulis ON relasiPenulisBuku.id_penulis = penulis.id;

COMMIT;
END;