# Smart Irrigation App (Expo)

Frontend for the Smart Irrigation project. Backend must be running first.

## Run the backend (required)
- Python **3.10 only**. Set up and start the API from `dadncnpm`:
  ```powershell
  cd C:\WORKS\Fourth_Year\Sem1\DADN\app\dadncnpm
  py -3.10 -m venv venv310
  venv310\Scripts\activate
  python -m pip install --upgrade pip
  pip install -r requirements.txt
  uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
  ```

## Configure API base URL
Create or edit `.env` in this folder:
```env
EXPO_PUBLIC_ANDROID_API_URL=http://10.0.2.2:8000   # Android emulator
EXPO_PUBLIC_IOS_API_URL=http://localhost:8000      # iOS simulator
# Physical device: replace both with your PC LAN IP, e.g. http://192.168.1.50:8000
```
Restart Expo after changing `.env` so vars reload.

## Run the frontend
```powershell
cd C:\WORKS\Fourth_Year\Sem1\DADN\app\DADN-FE
npm install
npx expo start -c
```
- When prompted about port conflicts, accept the alternate port.
- Open the app in Expo Go / emulator / simulator. Login will call the backend at the URLs above.

## Notes
- Uses Expo Router (file-based routing) under `src/app`.
- Axios base URL is set via the env vars above, with sensible fallbacks for emulators.
