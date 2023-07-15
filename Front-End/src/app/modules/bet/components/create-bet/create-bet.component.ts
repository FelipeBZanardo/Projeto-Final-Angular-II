import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bet } from 'src/app/models/bet.model';
import { BetService } from '../../services/bet.service';

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrls: ['./create-bet.component.css'],
})
export class CreateBetComponent implements OnInit {
  public bet?: Bet;
  public id?: number;
  public title = 'Nova Aposta';

  public betForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private betService: BetService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.bet = this.betService.findById(this.id);
      this.title = 'Editar Aposta';
      this.updateForm();
    }
  }

  public buildForm(): void {
    const uniqueNumbersValidator = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const dozens = control.value;
      const selectedNumbers = dozens
      .map((dozen: any) => dozen.number)
      .filter((n: any) => n !== null);
      
      const uniqueNumbers = [...new Set(selectedNumbers)];

      if (uniqueNumbers.length !== 5 && selectedNumbers.length === 5)
        return { duplicateNumbers: true };
      else 
        return null;
    };

    this.betForm = new FormGroup({
      id: new FormControl(),
      raffleNumber: new FormControl(null, [Validators.required]),
      dozens: new FormArray(
        [
          new FormGroup({
            number: new FormControl(null, [
              Validators.required,
              Validators.min(1),
              Validators.max(80),
            ]),
          }),
          new FormGroup({
            number: new FormControl(null, [
              Validators.required,
              Validators.min(1),
              Validators.max(80),
            ]),
          }),
          new FormGroup({
            number: new FormControl(null, [
              Validators.required,
              Validators.min(1),
              Validators.max(80),
            ]),
          }),
          new FormGroup({
            number: new FormControl(null, [
              Validators.required,
              Validators.min(1),
              Validators.max(80),
            ]),
          }),
          new FormGroup({
            number: new FormControl(null, [
              Validators.required,
              Validators.min(1),
              Validators.max(80),
            ]),
          }),
        ],
        { validators: uniqueNumbersValidator }
      ),
      betDate: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{2}\d{2}\d{4}$/),
      ]),
    });
  }

  get dozens() {
    return this.betForm.controls['dozens'] as FormArray;
  }

  private updateForm(): void {
    
    this.dozens.setValue([
      { number: this.bet?.dozens[0] },
      { number: this.bet?.dozens[1] },
      { number: this.bet?.dozens[2] },
      { number: this.bet?.dozens[3] },
      { number: this.bet?.dozens[4] },
    ]);
    this.betForm.patchValue(this.bet as Bet);
  }

  public onSubmit(): void {
    if (this.id) {
      this.betService.update(this.betForm.getRawValue());
    } else {
      this.betService.create(this.betForm.getRawValue());
    }
    this.router.navigate(['/bet']);
  }

  public onCancel(): void {
    this.router.navigate(['/bet']);
  }
}
