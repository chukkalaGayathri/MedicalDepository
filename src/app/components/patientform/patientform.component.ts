import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-patientform',
  templateUrl: './patientform.component.html',
  styleUrls: ['./patientform.component.css']
})
export class PatientformComponent implements OnInit {
  showSugarLevels: any;
  toggleSugarLevels() {
    this.showSugarLevels = !this.showSugarLevels;
  }

  symptomsData: any[] = [];
  allergiesData: any[] = [];
  patientForm: FormGroup;
  filteredSymptoms: string[] = [];
  // filteredAllergies: string[] = [];  


  constructor(private fb: FormBuilder, private myservice: MyserviceService) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      bloodPressure: this.fb.group({
        systolic: ['', Validators.required],
        diastolic: ['', Validators.required],
      }),
      sugarLevel: this.fb.group({
        type: ['fasting'],
        fasting: [''],
        postPrandial: [''],
      }),
      bloodGroup: ['', Validators.required],
      allergies: [''],
      additionalInfo: [''],
      systolicPressure: ['', Validators.required],
      diastolicPressure: ['', Validators.required],
      temperature: ['', Validators.required],
      sugarType: ['fasting'],
      fastingSugar: [''],
      postPrandialSugar: [''],
    });


    this.myservice.getSymptoms().subscribe(data => {
      this.symptomsData = data;
      console.log(this.symptomsData); // Check if data is received
    });
    this.myservice.getAllergies().subscribe(data => {
      this.allergiesData = data;
      console.log(this.allergiesData); // Check if data is received
    });

    this.patientForm.get('additionalInfo').valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => this._filterSymptoms(value))
      )
      .subscribe(filteredSymptoms => {
        this.filteredSymptoms = filteredSymptoms;  // Update filteredSymptoms
        console.log(filteredSymptoms);
      });

  }


  submitForm() {
    if (this.patientForm.valid) {
      console.log('Patient Information:', this.patientForm.value);

    }
  }

  symptomSelected(event: MatAutocompleteSelectedEvent): void {
    if (event && event.option && event.option.viewValue) {
      const selectedSymptom = event.option.viewValue;
      const additionalInfoControl = this.patientForm.get('additionalInfo');

      if (additionalInfoControl) {
        const currentSymptoms = additionalInfoControl.value || [];
        additionalInfoControl.setValue([...currentSymptoms, selectedSymptom]);
      }
    }
  }

  private _filterSymptoms(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.symptomsData
      .filter(symptom => symptom.name.toLowerCase().includes(filterValue))
      .map(symptom => symptom.name);
  }


}
