CREATE TABLE `dev`.`real_time_monitoring` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `speed` INT NOT NULL,
  `ctime` INT NOT NULL,
  `driverID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
