import { Component, OnInit, Input } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'trk-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css']
})
export class MySkillsComponent implements OnInit {
	@Input() public milestoneID : string;
	@Input() public org : string;
	@Input() public authuid: string;
	selectedOption: string;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

}

@Component({
  selector: 'trk-dialog-result-example-dialog',
  template: `I am a dialog`,
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}