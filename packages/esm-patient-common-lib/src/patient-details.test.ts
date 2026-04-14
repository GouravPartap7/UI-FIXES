import { getIncludedPatientIdentifierValues } from './patient-details';

describe('getIncludedPatientIdentifierValues', () => {
  it('excludes identifiers whose type code is configured to be hidden', () => {
    const patient = {
      identifier: [
        {
          value: 'VISIBLE-001',
          type: {
            coding: [{ code: 'visible-code' }],
          },
        },
        {
          value: 'HIDDEN-001',
          type: {
            coding: [{ code: 'hidden-code' }],
          },
        },
      ],
    } as fhir.Patient;

    expect(getIncludedPatientIdentifierValues(patient, ['hidden-code'])).toEqual(['VISIBLE-001']);
  });

  it('keeps identifiers with incomplete type metadata and ignores empty values', () => {
    const patient = {
      identifier: [
        {
          value: 'NO-TYPE',
        },
        {
          value: 'NO-CODING',
          type: {},
        },
        {
          value: 'NO-CODE',
          type: {
            coding: [{}],
          },
        },
        {
          value: '',
          type: {
            coding: [{ code: 'visible-code' }],
          },
        },
      ],
    } as fhir.Patient;

    expect(getIncludedPatientIdentifierValues(patient, ['hidden-code'])).toEqual(['NO-TYPE', 'NO-CODING', 'NO-CODE']);
  });

  it('returns an empty list when the patient has no identifiers', () => {
    expect(getIncludedPatientIdentifierValues(undefined, ['hidden-code'])).toEqual([]);
    expect(getIncludedPatientIdentifierValues({} as fhir.Patient, ['hidden-code'])).toEqual([]);
  });
});
