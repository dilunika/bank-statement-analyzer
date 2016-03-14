package org.jkd.prod.bsa.repository;

import org.jkd.prod.bsa.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
