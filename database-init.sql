drop database if exists devcafe;
create database devcafe;
grant all privileges on devcafe.* to dev@localhost identified by 'devcafeuser';
