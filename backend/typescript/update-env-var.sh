#!/bin/bash

# Add the export command to the shell profile file
export TEST_ENV_VAR="initial value"

# Define a function to update the value of the environment variable
update_test_env_var() {
  export TEST_ENV_VAR=$(date +%Y-%m-%dT%H:%M:%S.%N)
}

# Set the interval to 10 seconds (you can adjust this as needed)
interval=1

# Start an infinite loop
while true; do
  # Update the value of the environment variable
  update_test_env_var
  sleep $interval
done
