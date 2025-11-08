"""
API Tests - Run these after starting the server to verify everything works
Usage: python test_api.py
"""

import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_api_status():
    """Test API health check"""
    print("\n🔍 Testing API Status...")
    response = requests.get(f"{BASE_URL}/status/")
    if response.status_code == 200:
        print("✅ API Status: OK")
        print(f"   Response: {response.json()}")
        return True
    else:
        print(f"❌ API Status Failed: {response.status_code}")
        return False

def test_projects_list():
    """Test projects endpoint"""
    print("\n🔍 Testing Projects List...")
    response = requests.get(f"{BASE_URL}/projects/")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Projects List: {len(data.get('results', data))} projects found")
        return True
    else:
        print(f"❌ Projects List Failed: {response.status_code}")
        return False

def test_skills_list():
    """Test skills endpoint"""
    print("\n🔍 Testing Skills List...")
    response = requests.get(f"{BASE_URL}/skills/")
    if response.status_code == 200:
        data = response.json()
        if data.get('success'):
            print(f"✅ Skills List: {len(data.get('data', []))} categories found")
            return True
    print(f"❌ Skills List Failed: {response.status_code}")
    return False

def test_experience_list():
    """Test experience endpoint"""
    print("\n🔍 Testing Experience List...")
    response = requests.get(f"{BASE_URL}/experience/")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Experience List: {len(data.get('results', data))} experiences found")
        return True
    else:
        print(f"❌ Experience List Failed: {response.status_code}")
        return False

def test_contact_form():
    """Test contact form submission"""
    print("\n🔍 Testing Contact Form...")
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "subject": "API Test",
        "message": "This is a test message from the API validation script."
    }
    response = requests.post(f"{BASE_URL}/contact/", json=payload)
    if response.status_code == 201:
        data = response.json()
        if data.get('success'):
            print("✅ Contact Form: Submission successful")
            return True
    print(f"❌ Contact Form Failed: {response.status_code}")
    return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("🧪 Portfolio Backend API Tests")
    print("=" * 60)
    print(f"Testing: {BASE_URL}")
    
    tests = [
        test_api_status,
        test_projects_list,
        test_skills_list,
        test_experience_list,
        test_contact_form,
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            if test():
                passed += 1
            else:
                failed += 1
        except requests.exceptions.ConnectionError:
            print(f"❌ Connection Error: Is the server running?")
            failed += 1
        except Exception as e:
            print(f"❌ Test Error: {str(e)}")
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {passed} passed, {failed} failed")
    print("=" * 60)
    
    if failed == 0:
        print("🎉 All tests passed! Your API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the errors above.")
        print("\nTroubleshooting:")
        print("1. Make sure the server is running: python manage.py runserver 8000")
        print("2. Check if migrations are applied: python manage.py migrate")
        print("3. Try populating sample data: python manage.py populate_data")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
