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
import { distinctUntilChanged, first, map } from 'rxjs';
import { BetDto } from 'src/app/models/bet.dto';
import { Bet } from 'src/app/models/bet.model';
import { BetService } from '../../services/bet.service';

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrls: ['./create-bet.component.css'],
})
export class CreateBetComponent implements OnInit {
  public id?: number;
  public title = 'Nova Aposta';
  public errorMessage?: string;

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
      this.title = 'Editar Aposta';
      this.updateForm();
    }
  }

  public buildForm(): void {

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
        { validators: this.uniqueNumbersValidator }
      ),
      betDate: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{2}\d{2}\d{4}$/),
      ]),
    });
  }

  public onSubmit(): void {
    if (this.id) {
      this.betService.update(this.betForm.getRawValue())
      .pipe(
        first(),
        distinctUntilChanged(
          (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
        ))
      .subscribe(
        {
        error: (err) => {
          this.errorMessage = err.error;
        },
        complete: () => {
          this.router.navigate(['/bet']);
        }});
    } else {
      this.betService.create(this.betForm.getRawValue())
      .pipe(first(),
      )
      .subscribe(
        {
        error: (err) => {
          this.errorMessage = err.error;
        },
        complete: () => {
          this.router.navigate(['/bet']);
        }});
    }
    
  }

  public onCancel(): void {
    this.router.navigate(['/bet']);
  }

  get dozens() {
    return this.betForm.controls['dozens'] as FormArray;
  }

  private setValueDozens(bet: Bet){
    this.dozens.setValue([   
      { number: bet.dozens[0] },
      { number: bet.dozens[1] },
      { number: bet.dozens[2] },
      { number: bet.dozens[3] },
      { number: bet.dozens[4] },
    ]);
  }

  private updateForm(): void {
    this.betService
    .findById(this.id!)
    .pipe(
      first(),
      map((betDto: BetDto) => {
          const mappedBet: Bet = {
            id: betDto.id!,
            raffleNumber: betDto.numeroSorteio,
            dozens: betDto.dezenas,
            betDate: this.betService.formatDate(betDto.dataJogo)
          }
          return mappedBet;
        }))
    .subscribe({
      next: (response) => {
        this.setValueDozens(response);
        this.betForm.patchValue(response as Bet);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private uniqueNumbersValidator = (control: AbstractControl): ValidationErrors | null => {
    const dozens = control.value;
    const selectedNumbers = dozens
    .map((dozen: any) => dozen.number)
    .filter((n: any) => n !== null);
    
    const uniqueNumbers = [...new Set(selectedNumbers)];

    if (uniqueNumbers.length !== 5 && selectedNumbers.length === 5)
      return { duplicateNumbers: true };

    return null;
  };
}
