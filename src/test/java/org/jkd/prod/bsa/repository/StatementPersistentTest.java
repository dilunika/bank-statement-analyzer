package org.jkd.prod.bsa.repository;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hamcrest.Matchers;
import org.jkd.prod.bsa.BsaApplication;
import org.jkd.prod.bsa.TestConfigurations;
import org.jkd.prod.bsa.model.Statement;
import org.jkd.prod.bsa.model.Transaction;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration({TestConfigurations.class, BsaApplication.class})
public class StatementPersistentTest {

	@Autowired
	private StatementRepository statementRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Test
	//@Transactional
	public void shouldSaveThenFindAndDelete() throws Exception {
		
		LocalDate fromDate = LocalDate.of(2016, 1, 1);
		LocalDate toDate = LocalDate.of(2015, 1, 31);
		
		Statement statement = newTransactionStatementBetween(fromDate, toDate)
								.withDebitTrasnactions(3)
								.withCrediTransactions(5)
								.generate();
		statementRepository.save(statement);

		entityManager.clear();
		long id  = statement.getId();
		Statement s1 = statementRepository.findOne(id);
		assertThat(s1.getFromDate(), equalTo(fromDate));
		assertThat(s1.getToDate(), equalTo(toDate));
		assertThat(s1.getTransactions().size(), equalTo(8));
		System.out.println(s1);
		statementRepository.delete(statement);
		
		Statement s2 = statementRepository.findOne(id);
		assertThat(s2, Matchers.nullValue());
		
	}

	private Builder newTransactionStatementBetween(LocalDate fromDate, LocalDate toDate) {
		
		return new Builder(fromDate, toDate);
	}
	
	private class Builder {
		
		List<Transaction> transactions;
		long preiodInDays;
		LocalDate fromDate;
		Statement statement;
		LocalDate toDate;
		
		Builder(LocalDate fromDate, LocalDate toDate) {
			this.fromDate = fromDate;
			this.toDate = toDate;
			transactions = new ArrayList<>();
			preiodInDays = toDate.until(fromDate, ChronoUnit.DAYS);
			
		}
		
		Statement  generate(){
			statement = new Statement();
			statement.setName("Statement from " + fromDate.toString() + " to " + toDate.toString());
			statement.setFromDate(fromDate);
			statement.setToDate(toDate);
			statement.setTransactions(transactions);
			return statement;
		}
		
		Builder withDebitTrasnactions(int n){
			String paymentType = "Debit";
			generateTransactions(n, paymentType);
			return this;
		}

		Builder withCrediTransactions(int n){
			String paymentType = "Credit";
			generateTransactions(n, paymentType);
			return this;
		}
		
		private void generateTransactions(int n, String paymentType) {
			for (int i = 0; i < n; i++) {
				
				Transaction t = newTransaction(paymentType);
				transactions.add(t);
				
			}
		}

		private Transaction newTransaction(String paymentType) {
			long r = ThreadLocalRandom.current().nextLong(preiodInDays);
			LocalDate date = fromDate.plus(r, ChronoUnit.DAYS);
			LocalDateTime transactionTime = LocalDateTime.of(date, LocalTime.now());
			Transaction t = new Transaction();
			t.setPaymentType(paymentType);
			t.setAmount(ThreadLocalRandom.current().nextDouble(5000));
			t.setTransactionTime(date);
			t.setStatement(statement);
		
			return t;
		}
		
	}
	
	
}
