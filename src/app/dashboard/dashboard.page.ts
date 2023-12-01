import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

const USERNAME = 'namasaya';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public nama = '';

  dataTamu: any = [];
  id: number | null = null;
  namaTamu: string = '';
  alamat: string = '';
  nomor_telepon: number | null = null;
  tanggal_kunjungan: Date | null = null;;
  keperluan: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.cekSesi();
    this.getTamu();
    console.log(this.nama);
  }

  async cekSesi() {
    const ambilNama = localStorage.getItem(USERNAME);
    if (ambilNama) {
      let namauser = ambilNama;
      this.nama = namauser;
    } else {
      this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Perhatian',
      subHeader: 'Yakin Logout aplikasi?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('Canceled', data);
          },
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            this.authService.logout();
            this.router.navigateByUrl('/', { replaceUrl: true });
          },
        },
      ],
    });

    await alert.present();
  }

  getTamu() {
    // this._apiService.tampil('tampilTamu.php').subscribe({
    this._apiService.tampil('index.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataTamu = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.namaTamu = '';
    this.alamat = '';
    this.nomor_telepon = null;
    this.keperluan = '';
    this.tanggal_kunjungan = null;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilTamu(this.id);
    this.reset_model();
    this.modal_edit = true;
    this.modal_tambah = false;
  }

  tambahTamu() {
    if (
      this.namaTamu != '' &&
      this.alamat != '' &&
      this.nomor_telepon != null &&
      this.tanggal_kunjungan != null &&
      this.keperluan != ''
    ) {
      let data = {
        nama: this.namaTamu,
        alamat: this.alamat,
        nomor_telepon: this.nomor_telepon,
        tanggal_kunjungan: this.tanggal_kunjungan,
        keperluan: this.keperluan,
      };
      this._apiService.tambah(data, '/tambahTamu.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah Tamu');
          this.getTamu();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah Tamu');
        },
      });
    } else {
      console.log('gagal tambah Tamu karena masih ada data yg kosong');
    }
  }

  hapusTamu(id: any) {
    this._apiService.hapus(id, '/hapusTamu.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getTamu();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilTamu(id: any) {
    this._apiService.lihat(id, '/lihatTamu.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let Tamu = hasil;
        this.id = Tamu.id;
        this.namaTamu = Tamu.nama;
        this.alamat = Tamu.alamat;
        this.nomor_telepon = Tamu.nomor_telepon;
        this.keperluan = Tamu.keperluan;
        this.tanggal_kunjungan = Tamu.tanggal_kunjungan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editTamu() {
    let data = {
      id: this.id,
      nama: this.namaTamu,
      alamat: this.alamat,
      nomor_telepon: this.nomor_telepon,
      tanggal_kunjungan: this.tanggal_kunjungan,
      keperluan: this.keperluan,
    };
    this._apiService.edit(data, '/editTamu.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getTamu();
        console.log('berhasil edit Tamu');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Tamu');
      },
    });
  }
}
