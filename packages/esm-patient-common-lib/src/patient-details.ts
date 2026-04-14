export function getIncludedPatientIdentifierValues(
  patient?: fhir.Patient,
  excludedPatientIdentifierCodeTypes: Array<string> = [],
): Array<string> {
  return (
    patient?.identifier
      ?.filter(({ value, type }) => {
        if (!value) {
          return false;
        }

        const identifierTypeCode = type?.coding?.[0]?.code;

        return !identifierTypeCode || !excludedPatientIdentifierCodeTypes.includes(identifierTypeCode);
      })
      .map(({ value }) => value) ?? []
  );
}
