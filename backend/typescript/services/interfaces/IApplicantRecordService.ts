interface IApplicantRecordService {
  /**
   * Given a term, fetch all application data from Firebase and populate the database accordingly.
   * @param term is the term we would like to populate
   */
  populateApplicantRecord(term: string): Promise<void>;
}

export default IApplicantRecordService;
