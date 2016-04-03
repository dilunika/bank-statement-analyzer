package org.jkd.prod.bsa;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.jkd.prod.bsa.model.Statement;
import org.jkd.prod.bsa.model.Transaction;
import org.jkd.prod.bsa.repository.StatementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

@SpringBootApplication
public class BsaApplication {

	private static final Logger LOG = LoggerFactory.getLogger(BsaApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(BsaApplication.class);
	}

	@Bean
	public JpaVendorAdapter jpaVendorAdapter() {

		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setShowSql(true);
		vendorAdapter.setGenerateDdl(true);

		return vendorAdapter;
	}

	@Bean
	public DataSource dataSource() {

		DriverManagerDataSource ds = new DriverManagerDataSource();
		ds.setDriverClassName("org.h2.Driver");
		ds.setUrl("jdbc:h2:file:./src/main/resources/h2/db;DB_CLOSE_DELAY=-1");
		ds.setUsername("sa");
		ds.setPassword("");

		return ds;
	}

	@Bean
	public CommandLineRunner trial(StatementRepository statementRepository, EntityManager entityManager) {

		return (args) -> {

			LocalDate fromDate = LocalDate.of(2016, 1, 1);
			LocalDate toDate = LocalDate.of(2015, 1, 31);

			Statement statement = newTransactionStatementBetween(fromDate, toDate).withDebitTrasnactions(3)
					.withCrediTransactions(5).generate();
			statementRepository.save(statement);
			entityManager.clear();
			long id  = statement.getId();
			Statement s1 = statementRepository.findOne(id);
			
			LOG.info("**************************** Statement ...."+ s1.toString());

		};

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

		Statement generate() {
			statement = new Statement();
			statement.setName("Statement from " + fromDate.toString() + " to " + toDate.toString());
			statement.setFromDate(fromDate);
			statement.setToDate(toDate);
			statement.setTransactions(transactions);
			return statement;
		}

		Builder withDebitTrasnactions(int n) {
			String paymentType = "Debit";
			generateTransactions(n, paymentType);
			return this;
		}

		Builder withCrediTransactions(int n) {
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
