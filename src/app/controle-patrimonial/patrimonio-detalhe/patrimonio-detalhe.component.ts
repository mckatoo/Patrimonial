import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-patrimonio-detalhe',
  templateUrl: './patrimonio-detalhe.component.html',
  styleUrls: ['./patrimonio-detalhe.component.scss']
})
export class PatrimonioDetalheComponent implements OnInit {

  id: number;
  patrimonio: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.patrimonio = this.route.params.subscribe((params:any) => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.patrimonio.unsubscribe();
  }

}
