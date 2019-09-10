import {
  Component,
  OnInit
} from '@angular/core';
import {
  IdTitle
} from './IdTitle';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedTargets = [];
  items: IdTitle[] = [{
      id: 1,
      title: "test1"
    },
    {
      id: 2,
      title: "test2"
    },
    {
      id: 3,
      title: "test3"
    },
    {
      id: 4,
      title: "test4"
    },
    {
      id: 5,
      title: "test5"
    }
  ];
  constructor() {}

  ngOnInit() {
    this.instantMultiselect();
  }

  instantMultiselect() {
    $(".dropdown dt a").on('click', function () {
      $(".dropdown dd ul").slideToggle('fast');
    });

    $(".dropdown dd ul li a").on('click', function () {
      $(".dropdown dd ul").hide();
    });

    $(document).bind('click', function (e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });
  }
  
  getSelectedValues(event) {
    console.log("event: " + event.target.title);
    if (event.target.checked) {
      var html = '<span id="' + event.target.value + '" title="' + event.target.title + '">' + event.target.title + '</span> ';
      $('.multiSel').append(html);
      $(".hida").hide();
    } else {
      let spanItems = $('.multiSel > span');
      if(spanItems.length > 1){
        $('span[id="' + event.target.value + '"]').remove();
        var ret = $(".hida");
        $('.dropdown dt a').append(ret);
      }else{
        window.alert('Please select at least one element.');
        event.target.checked = true; // for cbokx's choice not to be removed
      }
    }
    let spanItems = $('.multiSel span');
    let items = [];
    for(let i=0; i<spanItems.length;i++){
      items.push(spanItems[i].id);
    }
    console.log('span items ids: '+items);// items have inside choice element ids
  }
}
