#!/usr/bin/env python3
"""
A Python script with heavy computational code to demonstrate performance.
This script includes:
- Matrix multiplication
- Fibonacci sequence calculation
- Prime number checking
- Recursive factorial
- Sorting algorithms
"""

import time
import random
import math
import numpy as np
from functools import lru_cache

# ========================
# 1. Heavy Matrix Operations
# ========================

def generate_large_matrix(size=1000):
    """Generate a large matrix filled with random values"""
    return np.random.rand(size, size)

def heavy_matrix_multiplication(matrix_size=500):
    """Perform heavy matrix multiplication"""
    print(f"Generating {matrix_size}x{matrix_size} matrix...")
    matrix_a = generate_large_matrix(matrix_size)
    matrix_b = generate_large_matrix(matrix_size)
    
    print("Starting matrix multiplication...")
    start_time = time.time()
    
    # Heavy computation
    result = np.dot(matrix_a, matrix_b)
    
    elapsed_time = time.time() - start_time
    print(f"Matrix multiplication completed in {elapsed_time:.2f} seconds")
    return result

# ========================
# 2. Fibonacci Sequence (Heavy Recursion)
# ========================

@lru_cache(maxsize=None)
def fibonacci(n):
    """Calculate Fibonacci number with memoization"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def compute_fibonacci_sequence(max_num=40):
    """Compute Fibonacci sequence up to max_num"""
    print(f"Computing Fibonacci sequence up to {max_num}...")
    start_time = time.time()
    
    sequence = [fibonacci(i) for i in range(max_num)]
    
    elapsed_time = time.time() - start_time
    print(f"Fibonacci sequence completed in {elapsed_time:.2f} seconds")
    return sequence

# ========================
# 3. Prime Number Sieve
# ========================

def sieve_of_eratosthenes(n):
    """Generate all primes up to n using Sieve of Eratosthenes"""
    print(f"Finding all prime numbers up to {n}...")
    start_time = time.time()
    
    if n < 2:
        return []
    
    # Initialize sieve
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False
    
    for i in range(2, int(math.sqrt(n)) + 1):
        if sieve[i]:
            sieve[i*i::i] = [False] * len(sieve[i*i::i])
    
    primes = [i for i, is_prime in enumerate(sieve) if is_prime]
    
    elapsed_time = time.time() - start_time
    print(f"Prime sieve completed in {elapsed_time:.2f} seconds")
    return primes

# ========================
# 4. Recursive Factorial (Deep Recursion)
# ========================

def factorial(n):
    """Calculate factorial recursively"""
    if n == 0:
        return 1
    return n * factorial(n - 1)

def compute_large_factorials():
    """Compute factorials of large numbers"""
    print("Computing large factorials...")
    start_time = time.time()
    
    factorials = {}
    for i in [5, 10, 15, 20, 25]:
        factorials[i] = factorial(i)
        print(f"{i}! = {factorials[i]}")
    
    elapsed_time = time.time() - start_time
    print(f"Factorial computations completed in {elapsed_time:.2f} seconds")
    return factorials

# ========================
# 5. Sorting Algorithms Comparison
# ========================

def generate_random_data(size=100000):
    """Generate random data for sorting"""
    return [random.randint(0, size) for _ in range(size)]

def quicksort(arr):
    """Quick sort implementation"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

def mergesort(arr):
    """Merge sort implementation"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = mergesort(arr[:mid])
    right = mergesort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    """Merge helper for merge sort"""
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def compare_sorting_algorithms():
    """Compare different sorting algorithms"""
    print("Generating random data for sorting comparison...")
    data = generate_random_data(50000)
    
    # Test quicksort
    print("Testing quicksort...")
    start_time = time.time()
    sorted_quick = quicksort(data.copy())
    quicksort_time = time.time() - start_time
    print(f"Quicksort completed in {quicksort_time:.2f} seconds")
    
    # Test mergesort
    print("Testing mergesort...")
    start_time = time.time()
    sorted_merge = mergesort(data.copy())
    mergesort_time = time.time() - start_time
    print(f"Mergesort completed in {mergesort_time:.2f} seconds")
    
    # Test built-in sort
    print("Testing built-in sort...")
    start_time = time.time()
    sorted_built = sorted(data.copy())
    builtin_time = time.time() - start_time
    print(f"Built-in sort completed in {builtin_time:.2f} seconds")

# ========================
# 6. Main Execution
# ========================

def run_heavy_computations():
    """Run all heavy computations"""
    print("="*50)
    print("STARTING HEAVY PYTHON COMPUTATIONS")
    print("="*50)
    
    # Run each heavy computation
    heavy_matrix_multiplication()
    print()
    
    compute_fibonacci_sequence()
    print()
    
    sieve_of_eratosthenes(1000000)
    print()
    
    compute_large_factorials()
    print()
    
    compare_sorting_algorithms()
    print()
    
    print("="*50)
    print("ALL HEAVY COMPUTATIONS COMPLETED!")
    print("="*50)

if __name__ == "__main__":
    run_heavy_computations()